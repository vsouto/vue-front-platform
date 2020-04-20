import { formatCurrency, formatPercentage } from "@/utils/formatters";

export const basicOptions = {
	maintainAspectRatio: false,
	legend: {
		display: false
	},
	responsive: true,
	responsiveAnimationDuration: 100
};
export let blueChartOptions = {
	...basicOptions,
	tooltips: {
		backgroundColor: '#f5f5f5',
		titleFontColor: '#333',
		bodyFontColor: '#666',
		bodySpacing: 4,
		xPadding: 12,
		mode: 'nearest',
		intersect: 0,
		position: 'nearest'
	},
	scales: {
		yAxes: [
			{
				barPercentage: 1.6,
				gridLines: {
					drawBorder: false,
					color: 'rgba(29,140,248,0.0)',
					zeroLineColor: 'transparent'
				},
				ticks: {
					suggestedMin: 60,
					suggestedMax: 125,
					padding: 20,
					fontColor: '#2380f7'
				}
			}
		],

		xAxes: [
			{
				barPercentage: 1.6,
				gridLines: {
					drawBorder: false,
					color: 'rgba(29,140,248,0.1)',
					zeroLineColor: 'transparent'
				},
				ticks: {
					padding: 20,
					fontColor: '#2380f7'
				}
			}
		]
	}
};

export let lineChartOptionsBlue = {
	...basicOptions,
	tooltips: {
		backgroundColor: '#f5f5f5',
		titleFontColor: '#333',
		bodyFontColor: '#666',
		bodySpacing: 4,
		xPadding: 12,
		mode: 'nearest',
		intersect: 0,
		position: 'nearest'
	},
	responsive: true,
	scales: {
		yAxes: [
			{
				barPercentage: 1.6,
				gridLines: {
					drawBorder: false,
					color: 'rgba(29,140,248,0.0)',
					zeroLineColor: 'transparent'
				},
				ticks: {
					suggestedMin: 60,
					suggestedMax: 125,
					padding: 20,
					fontColor: '#9e9e9e'
				}
			}
		],

		xAxes: [
			{
				barPercentage: 1.6,
				gridLines: {
					drawBorder: false,
					color: 'rgba(29,140,248,0.1)',
					zeroLineColor: 'transparent'
				},
				ticks: {
					padding: 20,
					fontColor: '#9e9e9e'
				}
			}
		]
	}
};

export let barChartOptionsGradient = {
	...basicOptions,
	tooltips: {
		backgroundColor: '#f5f5f5',
		titleFontColor: '#333',
		bodyFontColor: '#666',
		bodySpacing: 4,
		xPadding: 12,
		mode: 'nearest',
		intersect: 0,
		position: 'nearest'
	},
	responsive: true,
	scales: {
		yAxes: [
			{
				gridLines: {
					drawBorder: false,
					color: 'rgba(253,93,147,0.1)',
					zeroLineColor: 'transparent'
				},
				ticks: {
					suggestedMin: 60,
					suggestedMax: 125,
					padding: 20,
					fontColor: '#9e9e9e'
				}
			}
		],

		xAxes: [
			{
				gridLines: {
					drawBorder: false,
					color: 'rgba(253,93,147,0.1)',
					zeroLineColor: 'transparent'
				},
				ticks: {
					padding: 20,
					fontColor: '#9e9e9e'
				}
			}
		]
	}
};

export let pieChartOptions = {
	...basicOptions,
	cutoutPercentage: 50,
	tooltips: {
		backgroundColor: '#f5f5f5',
		titleFontColor: '#333',
		bodyFontColor: '#666',
		bodySpacing: 4,
		xPadding: 12,
		mode: 'nearest',
		intersect: 0,
		position: 'nearest',
		callbacks: {
			title: function(tooltipItems, data) {
				const idx = tooltipItems && tooltipItems[0].index
				const dt_idx = tooltipItems && tooltipItems[0].datasetIndex;
				const dataset = data.datasets && data.datasets[dt_idx] || {}
				const label = dataset.label[idx] || ''
				return label;
			},
			label: function(tooltipItem, data) {
				const idx = tooltipItem && tooltipItem.index
				const dt_idx = tooltipItem && tooltipItem.datasetIndex;
				const dataset = data.datasets && data.datasets[dt_idx] || {}
				let value = dataset.data[idx]
				if (value)
					value = formatCurrency(value)
				return value;
			}
		}
	},

	scales: {
		yAxes: [
			{
				display: 0,
				ticks: {
					display: false
				},
				gridLines: {
					drawBorder: false,
					zeroLineColor: 'transparent',
					color: 'transparent'
				}
			}
		],

		xAxes: [
			{
				display: 0,
				barPercentage: 1.6,
				gridLines: {
					drawBorder: false,
					color: 'transparent',
					zeroLineColor: 'transparent'
				},
				ticks: {
					display: false
				}
			}
		]
	}
};

export let purpleChartOptions = {
	...basicOptions,
	tooltips: {
		backgroundColor: '#f5f5f5',
		titleFontColor: '#333',
		bodyFontColor: '#666',
		bodySpacing: 4,
		xPadding: 12,
		mode: 'nearest',
		intersect: 0,
		position: 'nearest',
		callbacks: {
			title: function(tooltipItems, data) {
				const idx = tooltipItems && tooltipItems[0].index
				const dt_idx = tooltipItems && tooltipItems[0].datasetIndex;
				const dataset = data.datasets && data.datasets[dt_idx] || {}
				const label = dataset.labels[idx] || ''
				let activeIndex = dataset.activeIndex
				let title = "";
				if (activeIndex == "roi_list")
					title = "ROI"
				else if (activeIndex == "revenue_list")
					title = "Rendimento"
				else if (activeIndex == "spend_list")
					title = "Investimento"
				else if (activeIndex == "earn_list")
					title = "Receita"
				if (label)
					title += ` - ${label}`
				return title;
			},
			label: function(tooltipItem, data) {
				const idx = tooltipItem && tooltipItem.index
				const dt_idx = tooltipItem && tooltipItem.datasetIndex;
				const dataset = data.datasets[dt_idx] || {}
				let value = dataset.data && dataset.data[idx] || ''
				let activeIndex = dataset.activeIndex
				if (value)
					if (activeIndex == "roi_list")
						value = formatPercentage(value, false, 0, "%")
					else
						value = formatCurrency(value)
				return value;
			}
		}
	},
	scales: {
		yAxes: [
			{
				barPercentage: 1.6,
				gridLines: {
					drawBorder: false,
					color: 'rgba(69, 71, 90, 0.1)',
					zeroLineColor: 'rgba(255, 0, 0, 0.1)'
				},
				ticks: {
					padding: 5,
					fontColor: '#9a9a9a'
				}
			}
		],

		xAxes: [
			{
				barPercentage: 1.6,
				gridLines: {
					drawBorder: false,
					color: 'rgba(69, 71, 90, 0.1)',
					zeroLineColor: 'transparent'
				},
				ticks: {
					display: false,
					padding: 5,
					fontColor: '#9a9a9a'
				}
			}
		]
	}
};

export let orangeChartOptions = {
	...basicOptions,
	tooltips: {
		backgroundColor: '#f5f5f5',
		titleFontColor: '#333',
		bodyFontColor: '#666',
		bodySpacing: 4,
		xPadding: 12,
		mode: 'nearest',
		intersect: 0,
		position: 'nearest'
	},
	scales: {
		yAxes: [
			{
				barPercentage: 1.6,
				gridLines: {
					drawBorder: false,
					color: 'rgba(29,140,248,0.0)',
					zeroLineColor: 'transparent'
				},
				ticks: {
					suggestedMin: 50,
					suggestedMax: 110,
					padding: 20,
					fontColor: '#ff8a76'
				}
			}
		],

		xAxes: [
			{
				barPercentage: 1.6,
				gridLines: {
					drawBorder: false,
					color: 'rgba(220,53,69,0.1)',
					zeroLineColor: 'transparent'
				},
				ticks: {
					padding: 20,
					fontColor: '#ff8a76'
				}
			}
		]
	}
};
export let greenChartOptions = {
	...basicOptions,
	tooltips: {
		backgroundColor: '#f5f5f5',
		titleFontColor: '#333',
		bodyFontColor: '#666',
		bodySpacing: 4,
		xPadding: 12,
		mode: 'nearest',
		intersect: 0,
		position: 'nearest'
	},
	scales: {
		yAxes: [
			{
				barPercentage: 1.6,
				gridLines: {
					drawBorder: false,
					color: 'rgba(29,140,248,0.0)',
					zeroLineColor: 'transparent'
				},
				ticks: {
					suggestedMin: 50,
					suggestedMax: 125,
					padding: 20,
					fontColor: '#9e9e9e'
				}
			}
		],

		xAxes: [
			{
				barPercentage: 1.6,
				gridLines: {
					drawBorder: false,
					color: 'rgba(0,242,195,0.1)',
					zeroLineColor: 'transparent'
				},
				ticks: {
					padding: 20,
					fontColor: '#9e9e9e'
				}
			}
		]
	}
};

export let barChartOptions = {
	...basicOptions,
	tooltips: {
		backgroundColor: '#f5f5f5',
		titleFontColor: '#333',
		bodyFontColor: '#666',
		bodySpacing: 4,
		xPadding: 12,
		mode: 'nearest',
		intersect: 0,
		position: 'nearest'
	},
	scales: {
		yAxes: [
			{
				gridLines: {
					drawBorder: false,
					color: 'rgba(29,140,248,0.1)',
					zeroLineColor: 'transparent'
				},
				ticks: {
					suggestedMin: 60,
					suggestedMax: 120,
					padding: 20,
					fontColor: '#9e9e9e'
				}
			}
		],
		xAxes: [
			{
				gridLines: {
					drawBorder: false,
					color: 'rgba(29,140,248,0.1)',
					zeroLineColor: 'transparent'
				},
				ticks: {
					padding: 20,
					fontColor: '#9e9e9e'
				}
			}
		]
	}
};
