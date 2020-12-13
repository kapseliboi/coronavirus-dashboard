import React from "react";
import Plot from "react-plotly.js";
import URLs from "common/urls";
import { PlotContainer } from "./Plotter.styles";
import useResponsiveLayout from "hooks/useResponsiveLayout";
import { hexToRgb } from "common/utils";


export const Plotter = ({ data, layout = {}, xaxis = {}, yaxis = {}, config = {}, margin = {}, style = {}, isTimeSeries = true, SrOnly = "", ...props }) => {

    const width = useResponsiveLayout(640);

    let tickvals, ticktext, tickmode = undefined;

    if ( layout?.barmode === "logy" ) {
        tickmode = 'array';

        const thresholds = [-1000, -10, 0, 10, 100, 1000, 10000, 100000, 1000000, 10000000];
        const minVal = Math.min(...data[0].y);
        const maxVal = Math.max(...data[0].y);

        ticktext = [
            minVal,
            ...thresholds.filter(value => value > minVal && value < maxVal),
            maxVal
        ];

        for ( const item of data ) {
            item.text = item.y;

            item.y = item.y.map(val =>
                val >= 0
                    ? Math.log(val)
                    : -Math.log(Math.abs(val))
            );

            item.hovertemplate ='%{text:.1f}';
        }

        tickvals = ticktext.map(val =>
            val >= 0
                ? val === 0
                ? 0
                : Math.log(val)
                : -Math.log(Math.abs(val))
        );

    }

    return <PlotContainer className={ "govuk-grid-row" }
                          aria-label={ "Displaying a graph of the data" }>
        <p className={ "govuk-visually-hidden" }>
            The data that is visualised in the chart is that which is tabulated
            under the "Data" tab. The tables do not include the rolling average metric
            (where the metric is included).
            { SrOnly }
        </p>
        <Plot
            data={ data }
            config={ {
                showLink: false,
                responsive: true,
                displaylogo: false,
                // displayModeBar: true,
                modeBarButtonsToRemove: [
                    "autoScale2d",
                    // "zoomIn2d",
                    // "zoomOut2d",
                    "toggleSpikelines",
                    "hoverClosestCartesian",
                    // "zoom2d",
                    // "pan2d",
                    "select2d",
                    "lasso2d",
                ],
                toImageButtonOptions: {
                    format: 'png',
                    filename: 'export',
                    height: 989,
                    width: 1600,
                    scale: 4
                },
                ...config
                // onLegendItem
            } }
            useResizeHandler={ true }
            style={ { display: "block", height: 350, ...style } }
            layout={ {
                hovermode: "x unified",
                // barmode: "overlay",
                // barmode: "stack",
                // height: 320,
                legend: {
                    orientation: 'h',
                    font: {
                        family: `"GDS Transport", Arial, sans-serif`,
                        size: width === "desktop" ? 15 : 12,
                    },
                    xanchor: 'auto',
                    // yanchor: 'auto'
                    y: -.2
                },
                showlegend: true,
                margin: {
                    l: width === "desktop" ? 80 : 30,
                    r: width === "desktop" ? 10 : 5,
                    b: 25,
                    t: 10,
                    pad: 0,
                    ...margin
                },
                xaxis: {
                    showgrid: false,
                    zeroline: false,
                    showline: false,
                    fixedrange: width !== "desktop",
                    tickslen: 10,
                    ticks: "outside",
                    tickson: "boundaries",
                    ticklen: 'labels',
                    type: isTimeSeries ? "date" : "category",
                    tickformat: '%d %b',
                    tickfont: {
                        family: `"GDS Transport", Arial, sans-serif`,
                        size: width === "desktop" ? 14 : 10,
                        color: "#6B7276"
                    },
                    // rangeslider: {range: ['20202-01-01', new Date().toString()]},
                    // rangeselector: {buttons: [
                    //     {
                    //       count: 7,
                    //       label: '7d',
                    //       step: 'day',
                    //       stepmode: 'backward'
                    //     },
                    //         {
                    //       count: 1,
                    //       label: '1m',
                    //       step: 'month',
                    //       stepmode: 'backward'
                    //     },
                    //         {
                    //       count: 3,
                    //       label: '3m',
                    //       step: 'month',
                    //       stepmode: 'backward'
                    //     },
                    //     {step: 'all'}
                    //   ]},
                    ...xaxis
                },
                yaxis: {
                    tickmode,
                    tickvals,
                    ticktext,
                    tickslen: 0,
                    ticks: width === "desktop" ? "outside" : "inside",
                    fixedrange: width !== "desktop",
                    tickson: "boundaries",
                    ticklen: 'labels',
                    tickcolor: "#f1f1f1",
                    tickformat: width === "desktop" ? ',r' : '.2s',
                    tickfont: {
                        family: `"GDS Transport", Arial, sans-serif`,
                        size: width === "desktop" ? 13 : 10,
                        color: "#6B7276",
                    },
                    ...yaxis
                },
                plot_bgcolor: "rgba(231,231,231,0)",
                paper_bgcolor: "rgba(255,255,255,0)",
                ...layout
            } }
            { ...props }
        />
    </PlotContainer>

}; // Plotter


export const Choropleth = ({ data, layout, config, ...props }) => {

    return <Plotter
        data={ [
            {
                type: 'choroplethmapbox',
                hoverinfo: 'text+z',
                colorscale: [
                    [0, '#F47738'],
                    [0.5, '#005EA5'],
                    [1, '#9DDAE8'],
                ],
                autocolorscale: false,
                reversescale: true,
                colorbar: {
                    thickness: 10,
                    thickfont: {
                        family: `"GDS Transport", Arial, sans-serif`
                    },
                },
                hoverlabel: {
                    font: {
                        family: `"GDS Transport", Arial, sans-serif`
                    },
                },
                center: {
                    'lat': 53.5,
                    'lon': -2
                },
                marker: {
                    line: {
                        color: '#2f2f2f',
                        width: 0.1
                    }
                },
                ...data
            }
        ] }
        config={ {
            toImageButtonOptions: {
                format: 'png',
                filename: 'export',
                height: 600,
                width: 1200,
                scale: 4
            },
            ...config
        } }
        layout={ {
            height: 500,
            geo: {
                fitbounds: "geojson",
                resolution: 50,
                scope: "europe",
                projection: {
                    lon: 2,
                    lat: 2,
                    roll: 130,
                }
            },
            mapbox: {
                style: URLs.mapStyle,
                center: {
                    lat: 55.5,
                    lon: -2.5
                },
                zoom: 4.2,
                layers: [
                    {
                        sourcetype: 'geojson',
                        source: `${ URLs.baseGeo }countries_v1.geojson`,
                        type: 'line',
                        color: '#a3a3a3',
                        line: {
                            width: 0.1
                        }
                    },
                ]
            },
            ...layout
        } }
        margin={ {
            l: 0,
            r: 0,
            b: 0,
            t: 0,
            pad: 0
        } }
        xaxis={ {
            showgrid: false,
            zeroline: false,
            showline: false,
        } }
        { ...props }
    />

}; // Mapper


export const ScatterPlotWithTrendLine = ({ scatterData, trendLineData, layout, config, ...props }) => {

    return <Plotter
        data={ [
            {
                type: 'heatmap',
                // mode: 'markers',
                showlegend: false,
                marker: {
                    size: 8,
                },
                fillcolor: '#005EA5',
                ...scatterData
            },
            {
                showlegend: false,
                mode: "lines",
                fillcolor: '#F47738',
                line: {
                    width: 3,
                    dash: "dash",
                    color: 'rgba(109,109,109,0.7)'
                },
                ...trendLineData
            }
        ] }
        config={ {
            displayModeBar: true,
            showLink: false,
            responsive: true,
            displaylogo: false,
            modeBarButtonsToRemove: [
                "autoScale2d",
                "zoomIn2d",
                "zoomOut2d",
                "toggleSpikelines",
                "hoverClosestCartesian",
                "zoom2d"
            ],
            toImageButtonOptions: {
                format: 'png',
                filename: 'export',
                height: 600,
                width: 1200,
                scale: 4
            },
            ...config
        } }
        layout={ {
            height: 500,
            legend: {
                orientation: 'h',
                font: {
                    family: `"GDS Transport", Arial, sans-serif`,
                    size: 16,
                },
                xanchor: 'auto',
                y: -.2
            },
            showlegend: true,
            // margin: {
            //     l: 40,
            //     r: 10,
            //     b: 20,
            //     t: 0,
            //     pad: 0
            // },
            // xaxis: {
            //     showgrid: false,
            //     zeroline: false,
            //     showline: false,
            //     tickfont:{
            //         family: `"GDS Transport", Arial, sans-serif`,
            //         size : 14,
            //         color: "#6f777b"
            //     }
            // },
            // yaxis: {
            //     // tickformat: 's',
            //     tickfont:{
            //         family: `"GDS Transport", Arial, sans-serif`,
            //         size : 14,
            //         color: "#6f777b",
            //     }
            // },
            plot_bgcolor: "rgba(231,231,231,0)",
            paper_bgcolor: "rgba(255,255,255,0)",
            ...layout
        } }
        { ...props }
    />

};  // ScatterPlot


const asCssRgb = ( hex ) => {

    const { r, g, b } = hexToRgb(hex);

    return `rgb(${r},${g},${b})`

};  // asCssRgb


export const Heatmap = ({ data, layout, config, ...props }) => {

    const width = useResponsiveLayout(640);

    const colorscale = [
        [0,   asCssRgb('#e0e543')],
        // [10/400,  asCssRgb('#e0e543')],
        //
        [10/400,  asCssRgb('#74bb68')],
        // [50/400,  asCssRgb('#74bb68')],
        //
        [50/400,  asCssRgb('#399384')],
        [100/400,  asCssRgb('#3375b7')],
        // [100/400, asCssRgb('#2067AB')],
        //
        [200/400, asCssRgb('#12407F')],
        // [200/400, asCssRgb('#12407F')],

        [400/400, asCssRgb('#53084a')],
        // [400/400, asCssRgb('#53084A')],

        // [1, asCssRgb('#53084A')],
        // [Math.max(data[0].zData)/400, asCssRgb('#53084A')],
    ];


    return <Plotter
        data={
            data.map(dataset => ({
                x: dataset.xData,
                y: dataset.yData,
                z: dataset.zData,
                type: "heatmap",
                colorscale,
                ygap: 1,
                fixedrange: true,
                zauto: false,
                zmin: 0,
                zmax: 400,
                colorbar: {
                    tickvals: [0, 10, 50, 100, 200, 400],
                    ticktext: ["0", "10", "50", "100", "200", "400+"],
                    tickmode: "array",
                    ticks: "outside",
                    tickson: "boundaries",
                    tickslen: 5,
                    ticklen: 'labels',
                    thickness: 20,
                    // ypad: 2,
                    x: 1,
                    len: .8,
                    // title: {
                    //
                    //     // align: "right",
                    //     // valign: "top",
                    // },
                    tickfont: {
                        family: `"GDS Transport", Arial, sans-serif`,
                        size: 10,
                        color: "#6B7276",
                    },
                },
                // colorscale: "Viridis",
                // reversescale: true
                //
                // mode: 'markers',
                // showlegend: false,
                // marker: {
                //     size: 8,
                // },
                // fillcolor: '#005EA5',
            }))
        }
        margin={{ l: width === "desktop" ? 80 : 50, }}
        layout={ {
            annotations: [ width === "desktop" && {
                text: data[0].label,
                textangle: 90,
                x: 1.07,
                align: "right",
                valign: "top",
                showarrow: false,
                xref: "paper",
                yref: "paper",
                xanchor: "right",
                yanchor:"middle",
                font: {
                    family: `"GDS Transport", Arial, sans-serif`,
                    size: 11,
                    // color: "#6B7276",
                },
            }],
            height: 350,
            legend: {
                orientation: 'h',
                font: {
                    family: `"GDS Transport", Arial, sans-serif`,
                    size: 16,
                },
                xanchor: 'auto',
                y: -.2
            },
            showlegend: true,
            // margin: {
            //     l: 40,
            //     r: 10,
            //     b: 20,
            //     t: 0,
            //     pad: 0
            // },
            plot_bgcolor: "rgba(231,231,231,0)",
            paper_bgcolor: "rgba(255,255,255,0)",
            ...layout
        } }
        yaxis={{
            fixedrange: false,
        }}
        { ...props }
    />

};  // ScatterPlot


export const Histogram = ({ data, currentLocation }) => {

    const width = useResponsiveLayout(640);

    return <Plot
        data={ [{
            x: data, type: "histogram",
            autobinx: true,
            histnorm: "percent"
        }] }
        config={ {
            showLink: false,
            responsive: true,
            displaylogo: false,
            staticPlot: true
        } }
        useResizeHandler={ true }
        style={ { display: "block", height: 150 } }
        layout={ {
            // hovermode: "x unified",
            // barmode: "overlay",
            // barmode: "stack",
            // height: 320,
            shapes: [{
                type: 'line',
                x0: currentLocation,
                xref: 'x',
                y0: 0,
                x1: currentLocation,
                yref: 'paper',
                y1: 1,
                line: {
                    color: '#cb0000',
                    width: 3,
                    // dash: 'dot'
                }
            }],
            legend: {
                orientation: 'h',
                font: {
                    family: `"GDS Transport", Arial, sans-serif`,
                    size: 8,
                },
                xanchor: 'auto',
                // yanchor: 'auto'
                // y: -.2
            },
            showlegend: false,
            margin: {
                l: 0,
                r: 0,
                b: 20,
                t: 0,
                pad: 0,
            },
            xaxis: {
                showgrid: false,
                zeroline: false,
                showline: false,
                tickslen: 10,
                ticks: "outside",
                tickson: "boundaries",
                ticklen: 'labels',
                // type: "histogram",
                tickfont: {
                    family: `"GDS Transport", Arial, sans-serif`,
                    size: 10,
                    color: "#6B7276"
                },
                // rangeslider: {range: ['20202-01-01', new Date().toString()]},
                // rangeselector: {buttons: [
                //     {
                //       count: 7,
                //       label: '7d',
                //       step: 'day',
                //       stepmode: 'backward'
                //     },
                //         {
                //       count: 1,
                //       label: '1m',
                //       step: 'month',
                //       stepmode: 'backward'
                //     },
                //         {
                //       count: 3,
                //       label: '3m',
                //       step: 'month',
                //       stepmode: 'backward'
                //     },
                //     {step: 'all'}
                //   ]},
            },
            yaxis: {
                tickslen: 5,
                ticks: "outside",
                tickson: "boundaries",
                ticklen: 'labels',
                tickcolor: "#f1f1f1",
                tickformat: width === "desktop" ? ',r' : '.2s',
                tickfont: {
                    family: `"GDS Transport", Arial, sans-serif`,
                    size: 14,
                    color: "#6B7276",
                },
            },
            plot_bgcolor: "rgba(231,231,231,0)",
            paper_bgcolor: "rgba(255,255,255,0)",
        } }
    />

}; // Histogram


export const XAxis = ({ data, layout = {}, xaxis = {}, yaxis = {}, config = {}, margin = {}, style = {}, isTimeSeries = true, SrOnly = "", ...props }) => {

    return <PlotContainer className={ "govuk-grid-row" }
                          height={ null }
                          aria-label={ "Displaying a graph of the data" }>
        <Plot
            data={ data }
            config={ {
                showLink: false,
                responsive: true,
                staticPlot: true,
                displaylogo: false,
                displayModeBar: false,
                ...config
                // onLegendItem
            } }
            useResizeHandler={ true }
            style={ { display: "block", height: 30, marginTop: -27, zIndex: 1, ...style } }
            layout={ {
                showlegend: false,
                margin: {
                    l: 6,
                    r: 3,
                    b: 25,
                    t: 0,
                    pad: 0,
                    ...margin
                },
                xaxis: {
                    showgrid: false,
                    zeroline: false,
                    showline: false,
                    tickslen: 15,
                    ticks: "outside",
                    tickson: "boundaries",
                    ticklen: 'labels',
                    type: isTimeSeries ? "date" : "category",
                    autorange: true,
                    tickformat: '%b',
                    tickfont: {
                        family: `"GDS Transport", Arial, sans-serif`,
                        size: 14,
                        color: "#6B7276"
                    },
                    ...xaxis
                },
                yaxis: {
                    showgrid: false,
                    zeroline: false,
                    showline: false,
                    ticks: "",
                    showticklabels: false,
                    tickslen: 0,
                    ...yaxis
                },
                plot_bgcolor: "rgba(231,231,231,0)",
                paper_bgcolor: "rgba(255,255,255,0)",
                ...layout
            } }
            { ...props }
        />
    </PlotContainer>

}; // Plotter
