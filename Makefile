upstream:
	@git remote add upstream https://github.com/iamogbz/oss-boilerplate
	@git push origin master
	@git push --all
	echo "upstream: remote successfully configured"

newoss:
	@export REPO_NAME=$(name) && export REPO_URL=$(url) && ./.github/scripts/configure.sh
	echo "project: new repo successfully configured"

typescript:
	@git fetch --all --prune
	@git pull upstream master
	@git checkout -b typescript-conversion
	@git pull upstream typescript-conversion

ifndef VERBOSE
.SILENT:
endif
