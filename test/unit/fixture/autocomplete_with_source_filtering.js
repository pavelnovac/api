module.exports = {
  'query': {
    'bool': {
      'must': [{
        'constant_score': {
          'filter': {
            'match_phrase': {
              'name.default': {
                'analyzer': 'peliasQuery',
                'boost': 100,
                'query': 'test',
                'slop': 3
              }
            }
          }
        }
      }],
      'should':[{
        'function_score': {
          'query': {
            'match_all': {}
          },
          'max_boost': 20,
          'score_mode': 'first',
          'boost_mode': 'replace',
          'functions': [{
            'field_value_factor': {
              'modifier': 'log1p',
              'field': 'popularity',
              'missing': 1
            },
            'weight': 1
          }]
        }
      },{
        'function_score': {
          'query': {
            'match_all': {}
          },
          'max_boost': 20,
          'score_mode': 'first',
          'boost_mode': 'replace',
          'functions': [{
            'field_value_factor': {
              'modifier': 'log1p',
              'field': 'population',
              'missing': 1
            },
            'weight': 3
          }]
        }
      }],
      'filter': [{
        'terms': {
          'source': ['test_source']
        }
      }]
    }
  },
  'sort': [ '_score' ],
  'size': 20,
  'track_scores': true
};
