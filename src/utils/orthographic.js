/**
 * Orthographic globe utilities
 * Extracted and adapted from wikiatlas.js
 */
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import worldData from '@/data/world-110m-ids.json'

/**
 * Create an orthographic globe centered on a specific location
 * @param {string} hookId - CSS selector for the container
 * @param {number} width - Width of the globe in pixels
 * @param {string} title - Title for the globe
 * @param {number} lat - Latitude to center on
 * @param {number} lon - Longitude to center on
 * @returns {Object} - SVG element and utility functions
 */
export const createOrthographicGlobe = (hookId, width, title, lat, lon) => {
  const height = width
  const lon_central = -lon
  const lat_central = -lat

  // Setup projection
  const proj = d3
    .geoOrthographic()
    .scale(width / 2)
    .rotate([lon_central, lat_central, 0])
    .translate([width / 2, height / 2])
    .clipAngle(90)

  const path = d3.geoPath().projection(proj)

  // Create SVG container
  const svg = d3
    .select(hookId)
    .append('svg')
    .attr('id', `${title.replace(/\s+/g, '_')}-orthographic-globe`)
    .attr('width', width)
    .attr('height', height)

  // Add drag behavior
  const drag = d3
    .drag()
    .on('start', function () {
      const rotate = proj.rotate()
      d3.select(this).datum({ x: rotate[0], y: rotate[1] })
    })
    .on('drag', function (event) {
      const d = d3.select(this).datum()
      const sensitivity = 0.25
      const newRotate = [d.x - event.x * sensitivity, d.y + event.y * sensitivity, 0]
      proj.rotate(newRotate)
      svg.selectAll('path').attr('d', path)
      svg.selectAll('.location-marker').attr('transform', (d) => {
        const coords = proj(d.coordinates)
        return coords ? `translate(${coords[0]}, ${coords[1]})` : null
      })
    })

  svg.call(drag)

  // Double-click to reset
  svg.on('dblclick', function () {
    proj.rotate([lon_central, lat_central, 0])
    svg.selectAll('path').attr('d', path)
    drawLocationMarker()
  })

  // Draw blue water background
  svg
    .append('circle')
    .attr('class', 'water')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('r', width / 2)
    .style('fill', '#C6ECFF')
    .style('stroke', '#656565')
    .style('stroke-width', 1)

  // Add gradient overlay
  const gradient = svg
    .append('defs')
    .append('linearGradient')
    .attr('id', `gradient-${title.replace(/\s+/g, '_')}`)
    .attr('x1', '0%')
    .attr('y1', '0%')
    .attr('x2', '100%')
    .attr('y2', '100%')

  gradient.append('stop').attr('offset', '50%').attr('stop-color', '#FFF').attr('stop-opacity', 0.3)

  gradient
    .append('stop')
    .attr('offset', '100%')
    .attr('stop-color', '#009')
    .attr('stop-opacity', 0.3)

  svg
    .append('circle')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('r', width / 2)
    .attr('fill', `url(#gradient-${title.replace(/\s+/g, '_')})`)
    .style('pointer-events', 'none')

  // Draw countries
  const countries = topojson.feature(worldData, worldData.objects.countries)

  svg
    .selectAll('.country')
    .data(countries.features)
    .enter()
    .append('path')
    .attr('class', 'country')
    .attr('d', path)
    .style('fill', '#FDFBEA')
    .style('stroke', 'none')

  // Draw country boundaries
  svg
    .append('path')
    .datum(topojson.mesh(worldData, worldData.objects.countries, (a, b) => a !== b))
    .attr('class', 'boundary')
    .attr('d', path)
    .style('fill', 'none')
    .style('stroke', '#656565')
    .style('stroke-width', 0.3)

  // Draw graticule (grid lines)
  const graticule = d3.geoGraticule().step([20, 20])
  svg
    .append('path')
    .datum(graticule)
    .attr('class', 'graticule')
    .attr('d', path)
    .style('fill', 'none')
    .style('stroke', '#777')
    .style('stroke-width', 0.3)
    .style('stroke-opacity', 0.5)

  // Draw coastlines
  svg
    .append('path')
    .datum(topojson.mesh(worldData, worldData.objects.countries, (a, b) => a === b))
    .attr('class', 'coast')
    .attr('d', path)
    .style('fill', 'none')
    .style('stroke', '#0978AB')
    .style('stroke-width', 0.3)

  // Function to draw location marker
  const drawLocationMarker = () => {
    svg.selectAll('.location-marker').remove()

    const coordinates = [lon, lat]
    const markerData = { coordinates }

    // Check if visible
    const angle = d3.geoDistance(coordinates, proj.invert([width / 2, height / 2]))
    if (angle > Math.PI / 2) return // Not visible on this hemisphere

    const coords = proj(coordinates)
    if (!coords) return

    svg
      .append('circle')
      .datum(markerData)
      .attr('class', 'location-marker')
      .attr('cx', coords[0])
      .attr('cy', coords[1])
      .attr('r', 3)
      .style('fill', '#ff4444')
      // .style('stroke', '#ffffff')
      // .style('stroke-width', 1.5)
      .style('pointer-events', 'none')
  }

  // Draw initial marker
  drawLocationMarker()

  return {
    svg,
    projection: proj,
    path,
    redraw: () => {
      svg.selectAll('path').attr('d', path)
      drawLocationMarker()
    },
  }
}
