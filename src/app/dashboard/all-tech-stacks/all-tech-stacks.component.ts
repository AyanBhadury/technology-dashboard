import { Component, OnInit } from '@angular/core';
import * as FusionCharts from 'fusioncharts';
const d = new Date();

const previousdatestring = (d.getFullYear() - 1) + "-" + (d.getMonth() + 1) + "-" + d.getDate();

const currentdatestring = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

const date_builder = previousdatestring + ":" + currentdatestring

const download_stats_url = `https://api.npmjs.org/downloads/range/${date_builder}/react,angular,vue,ember`;
@Component({
  selector: 'app-all-tech-stacks',
  templateUrl: './all-tech-stacks.component.html',
  styleUrls: ['./all-tech-stacks.component.css']
})
export class AllTechStacksComponent implements OnInit {
  download_data: any;
  overviewinfo: string;
  stargazers_data: any;
  contributions_data: any;
  constructor() {
    this.overviewinfo = "Overview of all tech stacks";
    this.download_data = {
      data: null,
      chart: {
        paletteColors: "#11DFF6,#ED5753,#46DD97,#FF7623"
      },
      caption: {
        text: 'NPM downloads',
        style: {
          text: {
            fill: "#5A5B75",
            "font-family": "avenir-heavy"
          }
        }
      },
      subcaption: {
        text: "Since " + (d.getFullYear() - 1),
        style: {
          text: {
            fill: "#5A5B75",
            "font-family": "avenir-medium"
          }
        }
      },
      yAxis: [{
        plot: [{
          value: 'React',
          type: 'line'
        }, {
          value: 'Angular',
          type: 'line'
        }, {
          value: 'Vue',
          type: 'line'
        }, {
          value: 'Ember',
          type: 'line'
        }],
        "title": "Download Count"
      }]

    };
    this.fetchdownloadData();

    this.stargazers_data = {
      "chart": {
        "theme": "fusion",
        "caption": "Total stars count",
        "captionfont": "avenir-heavy",
        "subCaption": "[GitHub]",
        "captionalignment": "left",
        "subcaptionalignment": "left",
        "subcaptionfontcolor": "#979797",
        "baseFont": "avenir-medium",
        "valueFont": "avenir-medium",
        "valueFontColor": "#5A5B75",
        "alignCaptionWithCanvas": "0",
        "captionFontColor": "#5A5B75",
        "captionFontSize": "16",
        "yaxisvaluedecimals": "0",
        "showyaxisvalues": "0",
        "showlimits": "0",
        "showupperlimit": "0",
        "adjustDiv": "0",
        "logoURL": "assets/Icons/noun_Star.svg",
        "logoScale": "75",
        "logoAlpha": "100",
        "logoTopMargin": "13",
        "logoPosition": "TR",
        "divlinealpha": "0",
        "showValues": "1",
        "placevaluesinside": "0",
        "numDivLines": "1",
        "anchorbgcolor": "#ffffff",
        "anchorradius": "5",
        "yaxismaxvalue": null,
        "plotToolText": "<b>$label</b> framework<br/>Starts Count : <b>$datavalue</b>"
      },
      "data": null
    };
    this.fetchStarsData();
    this.contributions_data = {
      "chart": {
        "theme": "fusion",
        "caption": "Total contributions count",
        "captionfont": "avenir-heavy",
        "subCaption": "[GitHub]",
        "captionalignment": "left",
        "subcaptionalignment": "left",
        "baseFont": "avenir-medium",
        "valueFont": "avenir-medium",
        "captionFontSize": "16",
        "alignCaptionWithCanvas": "0",
        "captionFontColor": "#5A5B75",
        "subcaptionfontcolor": "#979797",
        "valueFontColor": "#5A5B75",
        "yaxisvaluedecimals": "0",
        "showyaxisvalues": "0",
        "showlimits": "0",
        "showupperlimit": "0",
        "adjustDiv": "0",
        "divlinealpha": "0",
        "logoURL": "assets/Icons/noun_group.svg",
        "logoScale": "75",
        "logoAlpha": "100",
        "logoPosition": "TR",
        "showValues": "1",
        "logoTopMargin": "13",
        "placevaluesinside": "0",
        "numDivLines": "1",
        "anchorbgcolor": "#ffffff",
        "anchorradius": "5",
        "yaxismaxvalue": null,
        "plotToolText": "<b>$label</b> framework<br/>Contributions Count : <b>$datavalue</b>"
      },
      "data": null
    };
    this.fetchContributionsData();
  }

  ngOnInit() {
  }
  fetchdownloadData() {
    let jsonify = res => res.json();
    let dataFetch = fetch(download_stats_url).then(jsonify);

    Promise.all([dataFetch]).then(res => {
      let data = res[0];
      let timeSeriesData = [];

      let rowsLn = data.angular.downloads.length;

      for (let i = 0; i < rowsLn; i++) {
        let date = data.angular.downloads[i].day;
        timeSeriesData.push([date, data.react.downloads[i].downloads, data.angular.downloads[i].downloads, data.vue.downloads[i].downloads, data.ember.downloads[i].downloads]);
      }


      let schema = [{
        "name": "Time",
        "type": "date",
        "format": "%Y-%m-%d"
      },
      {
        "name": "React",
        "type": "number"
      },
      {
        "name": "Angular",
        "type": "number"
      },
      {
        "name": "Vue",
        "type": "number"
      }, {
        "name": "Ember",
        "type": "number"
      }
      ];
      let fusionTable = new FusionCharts.DataStore().createDataTable(
        timeSeriesData,
        schema
      );
      this.download_data.data = fusionTable;
    });
  }

  fetchStarsData() {
    let jsonify2 = res1 => res1.json();

    let reactdataFetch = fetch('https://api.github.com/repos/facebook/react?state=closed&access_token=79d612789a57b392c7d9ed965a1a7109fb102756').then(jsonify2);
    let angulardataFetch = fetch('https://api.github.com/repos/angular/angular?state=closed&access_token=79d612789a57b392c7d9ed965a1a7109fb102756').then(jsonify2);
    let vuedataFetch = fetch('https://api.github.com/repos/vuejs/vue?state=closed&access_token=79d612789a57b392c7d9ed965a1a7109fb102756').then(jsonify2);
    let emberdataFetch = fetch('https://api.github.com/repos/emberjs/ember.js?state=closed&access_token=79d612789a57b392c7d9ed965a1a7109fb102756').then(jsonify2);

    Promise.all([reactdataFetch, angulardataFetch, vuedataFetch, emberdataFetch]).then(res1 => {
      if (res1['message']) {

        res1 = JSON.parse(localStorage.getItem("githubdata"));
      }
      else {
        window.localStorage.setItem("githubdata", JSON.stringify(res1));

      }
      let stardata = [];

      let packages = ['React', 'Angular', 'Vue', 'Ember'];

      for (let i = 0; i < packages.length; i++) {
        stardata.push({
          label: Object.values(packages)[i],
          value: Object.values(res1)[i].stargazers_count
        });

      }

      this.stargazers_data.chart.yaxismaxvalue = Math.max(...stardata.map(item => item.value), 0) + 30000;

      this.stargazers_data.data = stardata;
    });
  }

  fetchContributionsData() {
    const fetchTotalContrs = (owner, repo) => {
      const url = `https://api.github.com/repos/${owner}/${repo}/contributors?state=closed&access_token=79d612789a57b392c7d9ed965a1a7109fb102756 
      `;
      return fetch(url)
        .then(resp => resp.json())
        .then(data => data.reduce((acc, curr) => acc + curr.contributions, 0))
    }

    const contrsPromises = [
      fetchTotalContrs("facebook", "react"),
      fetchTotalContrs("angular", "angular"),
      fetchTotalContrs("vuejs", "vue"),
      fetchTotalContrs("emberjs", "ember.js")
    ]

    Promise.all(contrsPromises)
      .then(([react, angular, vue, ember]) => {
        if (react['message']) {

          react = JSON.parse(localStorage.getItem("reactdata"));
        }
        else {
          window.localStorage.setItem("reactdata", JSON.stringify(react));

        }

        if (angular['message']) {

          angular = JSON.parse(localStorage.getItem("angulardata"));
        }
        else {
          window.localStorage.setItem("angulardata", JSON.stringify(angular));

        }

        if (vue['message']) {

          vue = JSON.parse(localStorage.getItem("vuedata"));
        }
        else {
          window.localStorage.setItem("vuedata", JSON.stringify(vue));

        }

        if (ember['message']) {

          ember = JSON.parse(localStorage.getItem("emberdata"));
        }
        else {
          window.localStorage.setItem("emberdata", JSON.stringify(ember));

        }

        const chartData = [];
        chartData.push({ label: "React", value: react });
        chartData.push({ label: "Angular", value: angular });
        chartData.push({ label: "Vue", value: vue });
        chartData.push({ label: "Ember", value: ember });

        this.contributions_data.chart.yaxismaxvalue = Math.max(...chartData.map(item => item.value), 0) + 3000;
        this.contributions_data.data = chartData;
      })
      .catch(console.log.bind(console));
  }
}
