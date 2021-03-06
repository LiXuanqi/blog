import React from "react"
import { Underline, Box, Circle, Highlight, StrikeThrough, CrossedOff } from './Rough'


// TODO: most of styles are same.
const H2 = props => <h2 style={{
    fontWeight: 700,
    lineHeight: 1.25,
    marginTop: '1.5rem',
    marginBottom: '1rem',
    fontSize: '1.75rem',
    color: 'var(--color-text-secondary)'
}} {...props} />

const H3 = props => <h3 style={{
    fontWeight: 600,
    lineHeight: 1.25,
    marginTop: '1.5rem',
    marginBottom: '1rem',
    fontSize: '1.5rem',
    color: 'var(--color-text-secondary)'
}} {...props} />

const H4 = props => <h4 style={{
    fontWeight: 500,
    lineHeight: 1.25,
    marginTop: '1.5rem',
    marginBottom: '1rem',
    fontSize: '1.25rem',
    color: 'var(--color-text-secondary)'
}} {...props} />


const P = props => <p style={{
    lineHeight: 1.625,
    fontWeight: 400,
    // color:  'hsl(210,38%,95%)',
    color: 'var(--color-text-primary)',
    marginBottom: '0.25rem'
}} {...props} />

const Blockquote = props => <blockquote style={{
    margin: '2rem 0',
    backgroundColor: 'var(--background-blockquote)',
    fontWeight: '400',
    borderRadius: '.3rem',
    borderLeft: '3px solid #6ab0f3',
    color: 'var(--color-text-primary)',
    padding: '2rem'
}} {...props} />

const Ul = props => <ul style={{
    listStyleType: 'disc',
    padding: '0 2rem'
}} {...props} />

const Ol = props => <ul style={{
    listStyleType: 'decimal',
    padding: '0 2rem'
}} {...props} />

const Li = props => <li style={{
    margin: '0.25rem'
}} {...props} />

const Img = props => <img style={{
    marginBottom: '1.25rem',
    backgroundColor: 'white'
}} {...props} /> 

const A = props => <a style={{
    cursor: 'pointer',
    textDecoration: 'underline',
    fontWeight: 600,
}} {...props}/>

const components = {
    h2: H2,
    h3: H3,
    h4: H4,
    a: A,
    p: P,
    ul: Ul,
    ol: Ol,
    li: Li,
    blockquote: Blockquote,
    Underline,
    Box,
    Circle,
    Highlight,
    StrikeThrough,
    CrossedOff,
    img: Img
}

export default components