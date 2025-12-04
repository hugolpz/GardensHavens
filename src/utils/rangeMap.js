/**
 * Range map utilities for species distribution visualization
 * Uses equirectangular projection with GBIF occurrence data
 */
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import worldData from '@/data/world-110m-ids.json'

/**
 * Create an equirectangular range map with species occurrences
 * @param {HTMLElement|string} container - DOM element or selector for the container
 * @param {number} width - Width of the map in pixels
 * @param {string} title - Title for the map
 * @param {Array} occurrences - Array of GeoJSON features with occurrence points
 * @returns {Object} - SVG element and utility functions
 */
export const createRangeMap = (container, width, title, occurrences = []) => {
  const height = width / 2 // Maintain aspect ratio for equirectangular

  // Setup equirectangular projection
  const projection = d3
    .geoEquirectangular()
    .scale(width / (2 * Math.PI))
    .translate([width / 2, height / 2])
    .center([0, 0])

  const path = d3.geoPath().projection(projection)

  // Create SVG container
  const svg = d3
    .select(container)
    .append('svg')
    .attr('id', `${title.replace(/\s+/g, '_')}-range-map`)
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`)

  // Create SVG groups for organized structure
  const waterGroup = svg.append('g').attr('class', 'water-group')
  const landGroup = svg.append('g').attr('class', 'land-group')
  const boundariesGroup = svg.append('g').attr('class', 'boundaries-group')
  const graticuleGroup = svg.append('g').attr('class', 'graticule-group')
  const occurrenceGroup = svg.append('g').attr('class', 'occurrence-group')

  // Draw water background
  waterGroup
    .append('rect')
    .attr('class', 'water')
    .attr('width', width)
    .attr('height', height)
    .style('fill', '#C6ECFF')

  // Draw countries
  const countries = topojson.feature(worldData, worldData.objects.countries)

  landGroup
    .selectAll('.country')
    .data(countries.features)
    .enter()
    .append('path')
    .attr('class', 'country')
    .attr('d', path)
    .style('fill', '#FDFBEA')
    .style('stroke', 'none')

  // Country boundaries
  boundariesGroup
    .append('path')
    .datum(topojson.mesh(worldData, worldData.objects.countries, (a, b) => a !== b))
    .attr('class', 'boundary')
    .attr('d', path)
    .style('fill', 'none')
    .style('stroke', '#656565')
    .style('stroke-width', 0.5)

  // Coastlines
  boundariesGroup
    .append('path')
    .datum(topojson.mesh(worldData, worldData.objects.countries, (a, b) => a === b))
    .attr('class', 'coast')
    .attr('d', path)
    .style('fill', 'none')
    .style('stroke', '#0978AB')
    .style('stroke-width', 0.5)

  // Graticule (grid lines)
  const graticule = d3.geoGraticule().step([30, 30])
  graticuleGroup
    .append('path')
    .datum(graticule)
    .attr('class', 'graticule')
    .attr('d', path)
    .style('fill', 'none')
    .style('stroke', '#777')
    .style('stroke-width', 0.5)
    .style('stroke-opacity', 0.3)

  // Function to draw occurrence points
  const drawOccurrences = (data) => {
    occurrenceGroup.selectAll('*').remove()

    if (!data || data.length === 0) return

    occurrenceGroup
      .selectAll('.occurrence-point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'occurrence-point')
      .attr('cx', (d) => {
        const coords = projection(d.geometry.coordinates)
        return coords ? coords[0] : -9999
      })
      .attr('cy', (d) => {
        const coords = projection(d.geometry.coordinates)
        return coords ? coords[1] : -9999
      })
      .attr('r', 2)
      .style('fill', '#B10000')
      .style('fill-opacity', 0.6)
      .style('stroke', '#FFFFFF')
      .style('stroke-width', 0.5)
      .style('stroke-opacity', 0.8)
      .append('title')
      .text((d) => {
        const country = d.properties.country || 'Unknown'
        const year = d.properties.year || 'Unknown year'
        return `${country}, ${year}`
      })
  }

  // Draw initial occurrences
  drawOccurrences(occurrences)

  return {
    svg,
    projection,
    path,
    groups: {
      water: waterGroup,
      land: landGroup,
      boundaries: boundariesGroup,
      graticule: graticuleGroup,
      occurrences: occurrenceGroup,
    },
    updateOccurrences: (newOccurrences) => {
      drawOccurrences(newOccurrences)
    },
    redraw: () => {
      landGroup.selectAll('path').attr('d', path)
      boundariesGroup.selectAll('path').attr('d', path)
      graticuleGroup.selectAll('path').attr('d', path)
      drawOccurrences(occurrences)
    },
  }
}
