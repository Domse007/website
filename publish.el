(require 'package)

(message "System: %s" (symbol-name system-type))

(when (equal system-type 'windows-nt)
  (setq package-check-signature nil))

(message "%s" (emacs-version))

(when (version< "28.0.50" emacs-version)
  (setq package-native-compile t
	warning-minimum-level :emergency))

(setq package-archives '(("gnu"   . "https://elpa.gnu.org/packages/")
			 ("melpa" . "https://melpa.org/packages/")))

(message "Working in %s" (expand-file-name default-directory))

(setq package-user-dir (expand-file-name "tmp/" default-directory))

(package-initialize)

(package-refresh-contents)

(defmacro check-package (package)
  `(progn (unless (package-installed-p ',package)
	    (message "Installing %s" (symbol-name ',package))
	    (package-install ',package))
	  (while (not (package-installed-p 'use-package))
	    (message "Waiting for %s" (symbol-name ',package))
	    (sleep-for 1))
	  (require ',package)))

(require 'ox-publish)
(check-package htmlize)

(defconst site-source-directory (expand-file-name "source/" default-directory))
(defconst site-export-directory (expand-file-name "public/" default-directory))

(defun build-entry (a b c)
  "Defines format of sitemap entries."
  (let ((time (format-time-string "%d.%m.%Y" (org-publish-find-date a c)))
	(title (org-publish-find-title a c)))
    (format "- %s: [[file:%s][%s]]" time a title)))

(setq org-publish-project-alist
      (list (list "site"
		  :recursive nil
		  :base-directory site-source-directory
		  :with-author t
		  :with-creator nil
		  :with-date t
		  :with-toc nil
		  :with-section-numbers nil
		  :time-stamp-file nil
		  :section-numbers nil
		  :auto-sitemap nil
		  :sitemap-format-entry #'build-entry
		  :publishing-directory site-export-directory
		  :publishing-function #'org-html-publish-to-html)))

(setq org-confirm-babel-evaluate nil
      org-html-validation-link nil
      org-html-head-include-scripts nil
      org-html-head-include-default-style nil
      org-src-fontify-natively t
      org-src-tab-acts-natively t
      org-html-head
      (concat "<link rel=\"stylesheet\" href=\"style/style.css\" />"
	      "<link href=\"https://fonts.googleapis.com/css?family=Source Code Pro\" rel=\"stylesheet\">"
	      "<div class=\"hdr\">"
	      "    <h1 id=\"name\"><a id=\"header-title\" href=\"/\">Dominik Keller</a></h1>"
	      "    <div id=\"header-selector\">"
	      "        <a class=\"main-selector\" href=\"/posts/overview.html\">Overview</a>"
	      "        <a class=\"main-selector\" href=\"/about.html\">About</a>"
	      "        <a class=\"main-selector\" href=\"https://www.github.com/domse007/\">Github</a>"
	      "    </div>"
	      "</div>"))


(delete-directory site-export-directory t)

(org-publish-remove-all-timestamps)
(org-publish-all t)


(let* ((src (expand-file-name "css/style.css" default-directory))
       (dest (expand-file-name "style/style.css" site-export-directory)))
  (message "Copying from %s to %s" src dest)
  (make-directory (expand-file-name "style/" site-export-directory))
  (copy-file src dest))
