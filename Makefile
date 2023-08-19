.DEFAULT_GOAL := all
.PHONY: clean all

BP := 8085
BA := "http://localhost"
DN := ":5"

all:
	emacs -Q --script publish.el

clean:
	rm -rf tmp public

pretty:
	broadwayd ":5" &
	@echo "Sleeping for a bit. Waiting for broadwayd."
	sleep 2
	GDK_BACKEND=broadway BROADWAY_DISPLAY=":5" emacs -Q -l publish.el
	ps | grep broadwayd | awk '{ print $1 }' | xargs kill
