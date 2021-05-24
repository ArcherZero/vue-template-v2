import Vue from 'vue'

Vue.filter('textEmptyFilter', function (value) {
  if (value === 0 || value === '0') return value
  if (!value || value === 'null') return '-'
  return value
})
