import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(`
  * [_type == 'startup' 
  && defined(slug.current) && !defined($search)
  || title match $search
  || category match $search
  || author -> name match $search ]
  | order(_createdAt desc) {
  _id, 
  _createdAt, 
  title, 
  slug, 
  category, 
  image, 
  description,
  views,
  author -> {_id, name, image, bio} 
}
`);

export const STARTUP_DETAILS_QUERY = defineQuery(`
  * [ _type == 'startup' && _id == $id ][0] {
  _id, 
  _createdAt, 
  title, 
  slug, 
  category, 
  image, 
  pitch, 
  views,
  description,
  author -> {_id, name, username, image, bio} 
}
`);

export const STARTUP_VIEWS_QUERY = defineQuery(`
  * [ _type == 'startup' && _id == $id ][0] {
  _id,
  views,
}
`);
