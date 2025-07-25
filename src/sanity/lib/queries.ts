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
  author -> {_id, name, image} 
}
`);

export const STARTUP_BY_ID_QUERY = defineQuery(`
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
  author -> {_id, name, username, image} 
}
`);

export const STARTUPS_BY_AUTHOR_QUERY = defineQuery(`
  * [_type == 'startup' && author._ref == $id]
  | order(_createdAt desc) {
  _id, 
  _createdAt, 
  title, 
  slug, 
  category, 
  image, 
  description,
  views,
  author -> {_id, name, image} 
}
`);

export const STARTUP_VIEWS_QUERY = defineQuery(`
  * [ _type == 'startup' && _id == $id ][0] {
  _id,
  views,
}
`);

export const AUTHOR_BY_GOOGLE_ID_QUERY = defineQuery(`
  * [ _type == 'author' && id == $id ][0] {
  _id,
  name,
  username,
  image,
  email,
}
`);

export const AUTHOR_BY_ID_QUERY = defineQuery(`
  * [ _type == 'author' && _id == $id ][0] {
  _id,
  name,
  username,
  image,
  email,
}
`);

export const PLAYLIST_BY_SLUG_QUERY =
  defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      username
    },
    views,
    description,
    category,
    image,
    pitch
  }
}`);
