/** 1 = $, 2 = $$, 3 = $$$, 4 = $$$$ */
export type PriceTier = 1 | 2 | 3 | 4

export type StoryTagId =
  | 'family-owned'
  | 'immigrant-cuisine'
  | 'historic-building'
  | 'generations-old'
  | 'neighborhood-institution'
  | 'community-hub'

/** Who the story comes from. */
export type SourceLabel = 'owner' | 'researched' | 'both'

export type StorySectionKind = 'family' | 'food' | 'building' | 'neighborhood'

export interface StorySection {
  kind: StorySectionKind
  title: string
  /** Short paragraphs, rendered in order. */
  body: string[]
}

export type SourceKind = 'owner-interview' | 'oral-history' | 'archive' | 'book' | 'article'

export interface Source {
  label: string
  kind: SourceKind
  note?: string
}

export interface WhatToOrder {
  dish: string
  why: string
}

/**
 * The public "card" for a place: safe to show to anyone, signed in or not.
 * The database enforces this split: only these fields are readable while signed out.
 */
export interface PlaceSummary {
  /** Stable, URL-safe id. Shared links depend on it, so never change it. */
  id: string
  name: string
  neighborhood: string
  cuisine: string
  priceTier: PriceTier
  tags: StoryTagId[]
  /** One- or two-sentence lede shown on cards and above the story. */
  summary: string
  sourceLabel: SourceLabel
  /** Placeholder until real geolocation exists. */
  mockDistanceMiles: number
  /** True for every fictional seed place. Drives the "Sample content" badge. */
  isPlaceholder: boolean
  /** Confirmed closed by an admin. People can only REPORT a closure; they cannot set this. */
  isClosed: boolean
}

/** The full story. Only available to signed-in users (enforced by the database). */
export interface Place extends PlaceSummary {
  /** Optional per place: a story may have any subset of the four sections. */
  sections: StorySection[]
  sources: Source[]
  whatToOrder: WhatToOrder
  /** 3 to 4 conversation starters for owners or staff. */
  askThem: string[]
}

export interface Neighborhood {
  name: string
  placeCount: number
}
