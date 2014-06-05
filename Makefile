all:
	java -cp 'lib/*' cucumber.api.cli.Main --format pretty --glue features/step_definitions/ features/
