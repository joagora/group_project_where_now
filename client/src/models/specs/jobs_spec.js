const assert = require('assert');
const Jobs = require('../jobs.js');


describe('CountriesFilter', function () {
  let jobs;
  let salaries;
  let jobTitle;

  beforeEach(function () {
    const jobs = new Jobs();
    const jobTitle = "Accountant";
    const salaries = [
        {
            "job": {
                "id": "ACCOUNT-MANAGER",
                "title": "Account Manager"
            },
            "salary_percentiles": {
                "percentile_25": 65672.09765947556,
                "percentile_50": 82222.04542565861,
                "percentile_75": 102942.72598133811
            }
        },
        {
            "job": {
                "id": "ACCOUNTANT",
                "title": "Accountant"
            },
            "salary_percentiles": {
                "percentile_25": 55522.66316377999,
                "percentile_50": 65777.5881571318,
                "percentile_75": 77926.5773150404
            }
        },
        {
            "job": {
                "id": "ADMINISTRATIVE-ASSISTANT",
                "title": "Administrative Assistant"
            },
            "salary_percentiles": {
                "percentile_25": 39397.49275616264,
                "percentile_50": 47247.88982277257,
                "percentile_75": 56662.56750198057
            }
        }
      ]
})
  it('should return salary for given job title', function () {
    const salary = {
        "job": {
            "id": "ACCOUNTANT",
            "title": "Accountant"
        },
        "salary_percentiles": {
            "percentile_25": 55522.66316377999,
            "percentile_50": 65777.5881571318,
            "percentile_75": 77926.5773150404
        }
    };
    const actual = jobs.findSalaryForJobTitle(salaries, jobTitle);
    assert.deepStrictEqual(actual, salary)
  })

})
