#curl 127.0.0.1:3000/experiments/6552869066c0843139f51778\
#	-H 'cycle_range: {"begin": 1, "end": 9}'
curl 127.0.0.1:3000/experiment_stats\
	-H 'filters: {"processor": "RV32_5S"}'
