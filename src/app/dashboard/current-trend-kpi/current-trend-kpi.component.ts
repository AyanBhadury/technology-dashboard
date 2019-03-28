import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-trend-kpi',
  templateUrl: './current-trend-kpi.component.html',
  styleUrls: ['./current-trend-kpi.component.css']
})
export class CurrentTrendKpiComponent implements OnInit {
  kpiinfo: string;
  score_data: any;
  quality_arr: any;
  popularity_arr: any;
  quality_data: any;
  popularity_data: any;
  lang: string = 'React';
  pointer_data: any;
  selected = 'react';
  tech_stack: any[];
  constructor() {

    this.tech_stack = [{
      value: 'React',
      className: 'fc_react',
      pColors: '#efefef,#11DFF6'
    },
    {
      value: 'Angular',
      className: 'fc_angular',
      pColors: '#efefef,#ED5753'
    },
    {
      value: 'Vue',
      className: 'fc_vue',
      pColors: '#efefef , #46DD97'
    },
    {
      value: 'Ember',
      className: 'fc_ember_logo',
      pColors: '#efefef,#FF7623'
    }
    ];

    this.kpiinfo = "Current trend for:";
    this.score_data = {
      "chart": {
        "caption": "Overall Rating",
        "showBorder": "0",
        "captionalignment": "left",
        "showShadow": "0",
        "use3DLighting": "0",
        "showLabels": "0",
        "showValues": "0",
        "paletteColors": "#efefef,#11DFF6",
        "bgColor": "#1D1B41",
        "bgAlpha": "0",
        "canvasBgAlpha": "0",
        "doughnutRadius": "75",
        "pieRadius": "90",
        "plotBorderAlpha": "0",
        "showToolTip": "0",
        "enableSlicing": "0",
        "baseFontSize": "14",
        "defaultCenterLabel": null,
        "centerLabelBold": "1",
        "centerLabelFontSize": "25",
        "enableRotation": "0",
        "logoURL": "assets/Icons/noun_ratings.svg",
        "logoScale": "100",
        "logoAlpha": "100",
        "logoPosition": "TR",
        "logoTopMargin": "16",
        "captionfontcolor": "#686980",
        "captionfontsize": "16",
        "captionfont": "avenir-heavy",
        "baseFont": "avenir-medium",
        "startingAngle": "90",
        "animateClockwise": "1"
      },
      data: null
    };
    this.quality_data = {
      "chart": {
        "caption": "Quality",
        "showBorder": "0",
        "captionfontcolor": "#686980",
        "captionfontsize": "16",
        "captionalignment": "left",
        "showShadow": "0",
        "use3DLighting": "0",
        "showLabels": "0",
        "showValues": "0",
        "paletteColors": "#efefef,#11DFF6",
        "bgColor": "#1D1B41",
        "bgAlpha": "0",
        "canvasBgAlpha": "0",
        "doughnutRadius": "75",
        "pieRadius": "90",
        "enableSlicing": "0",
        "plotBorderAlpha": "0",
        "showToolTip": "0",
        "baseFontSize": "14",
        "logoURL": "assets/Icons/quality.svg",
        "logoScale": "100",
        "logoAlpha": "100",
        "logoPosition": "TR",
        "logoTopMargin": "10",
        "defaultCenterLabel": null,
        "centerLabelBold": "1",
        "centerLabelFontSize": "25",
        "enableRotation": "0",
        "captionfont": "avenir-heavy",
        "baseFont": "avenir-medium",
        "startingAngle": "90",
        "animateClockwise": "1"
      },
      data: null
    };
    this.popularity_data = {
      "chart": {
        "caption": "Popularity",
        "captionfontcolor": "#686980",
        "captionfontsize": "16",
        "captionfont": "avenir-heavy",
        "captionfontbold": "1",
        "showBorder": "0",
        "captionalignment": "left",
        "showShadow": "0",
        "use3DLighting": "0",
        "showLabels": "0",
        "showValues": "0",
        "paletteColors": "#efefef,#11DFF6",
        "bgColor": "#1D1B41",
        "bgAlpha": "0",
        "canvasBgAlpha": "0",
        "doughnutRadius": "75",
        "pieRadius": "90",
        "enableSlicing": "0",
        "plotBorderAlpha": "0",
        "showToolTip": "0",
        "logoURL": "assets/Icons/noun_achievement.svg",
        "logoScale": "90",
        "logoAlpha": "100",
        "logoPosition": "TR",
        "logoTopMargin": "13",
        "defaultCenterLabel": null,
        "centerLabelBold": "1",
        "centerLabelFontSize": "25",
        "enableRotation": "0",
        "baseFont": "avenir-medium", "startingAngle": "90",
        "animateClockwise": "1"
      },
      data: null
    };
    this.fetchnpmsdata();
  }

  ngOnInit() {
  }
  onSelectionChange(lang) {
    //this.fetchnpmsdata();
    this.lang = lang;
    this.score_data.chart.updateAnimDuration = 0.6;
    this.quality_data.chart.updateAnimDuration = 0.6;
    this.popularity_data.chart.updateAnimDuration = 0.6;

    for (let i = 0; i < this.tech_stack.length; i++) {
      if (this.lang === this.tech_stack[i].value) {
        this.score_data.chart.paletteColors = this.tech_stack[i].pColors
        this.quality_data.chart.paletteColors = this.tech_stack[i].pColors
        this.popularity_data.chart.paletteColors = this.tech_stack[i].pColors

        this.score_data.chart.defaultCenterLabel = Math.floor((this.pointer_data[i+(i+1)].value) * 100).toString() + '%';
        this.quality_data.chart.defaultCenterLabel = Math.floor((this.quality_arr[i+(i+1)].value) * 100).toString() + '%';
        this.popularity_data.chart.defaultCenterLabel = Math.floor((this.popularity_arr[i+(i+1)].value) * 100).toString() + '%';

        this.score_data.data = [ {
          // label: Object.keys(data)[i],
          value: 100 - Math.floor((this.pointer_data[i+(i+1)].value) * 100)
        },
          {
            //label: this.pointer_data[i+(i+1)].label,
            value: Math.floor((this.pointer_data[i+(i+1)].value) * 100)
          }
        ];
        this.quality_data.data = [
          {
            // label: Object.keys(data)[i],
            value: 100 - Math.floor((this.quality_arr[i+(i+1)].value) * 100)
          },
          {
          //  label: this.quality_arr[i+(i+1)].label,
            value: Math.floor((this.quality_arr[i+(i+1)].value) * 100)
          }
        ];
        this.popularity_data.data = [
           {
            // label: Object.keys(data)[i],
            value: 100 - Math.floor((this.popularity_arr[i+(i+1)].value) * 100)
          },
          {
         //   label: this.popularity_arr[i+(i+1)].label,
            value: Math.floor((this.popularity_arr[i+(i+1)].value) * 100)
          }
        ];

      }
    }


  }

  fetchnpmsdata() {
    let jsonify = res => res.json();
    let dataFetch = fetch('https://api.npms.io/v2/package/mget', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(["react", "angular", "vue", "ember"])
    }).then(jsonify);

    Promise.all([dataFetch]).then(res => {
      let data = res[0];

      let qualitydata = [];
      let popularitydata = [];
      let scoredata = [];

      let length = Object.keys(data).length;

      for (let i = 0; i < length; i++) {
        console.log( Object.values(data)[i]['score'].detail.quality);
        qualitydata.push(
          {
            // label: Object.keys(data)[i],
            value: 100 - (Object.values(data)[i]['score'].detail.quality)
          },{
          label: Object.keys(data)[i],
          value: Object.values(data)[i]['score'].detail.quality
        });
        popularitydata.push({
          // label: Object.keys(data)[i],
          value: 100 - Object.values(data)[i]['score'].detail.popularity
        },{
          label: Object.keys(data)[i],
          value: Object.values(data)[i]['score'].detail.popularity
        });

        scoredata.push( {
          value: 100 - Object.values(data)[i]['score'].final
        },{
          label: Object.keys(data)[i],
          value: Object.values(data)[i]['score'].final
        })

      }

      this.quality_arr = qualitydata;
      this.popularity_arr = popularitydata;
      this.pointer_data = scoredata;

      this.score_data.chart.defaultCenterLabel = Math.floor((this.pointer_data[1].value) * 100).toString() + '%';
      this.score_data.data = [
         {
          // label: Object.keys(data)[i],
          value: 100 - Math.floor((this.pointer_data[1].value) * 100)
        },
        {
          label: this.pointer_data[0].label,
          value: Math.floor((this.pointer_data[1].value) * 100)
        }
      ];
      this.popularity_data.chart.defaultCenterLabel = Math.floor((this.popularity_arr[1].value) * 100).toString() + '%';
      this.popularity_data.data = [
        {
          // label: Object.keys(data)[i],
          value: 100 - Math.floor((this.popularity_arr[1].value) * 100)
        },{
        label: this.popularity_arr[1].label,
        value: Math.floor((this.popularity_arr[1].value) * 100)
      }
      ];

      this.quality_data.chart.defaultCenterLabel = Math.floor((this.quality_arr[1].value) * 100).toString() + '%';
     
     console.log( this.quality_arr);
      this.quality_data.data = [{
        
          // label: Object.keys(data)[i],
          value: 100 - Math.floor((this.quality_arr[1].value) * 100)
        },{
        label: this.quality_arr[1].label,
        value: Math.floor((this.quality_arr[1].value) * 100)
      }, 
      ];
      //  this.issecondapi = true;

    });
  }
}
