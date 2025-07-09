import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(`
  * [_type == 'startup' && defined(slug.current)] 
  | order(_createdAt desc) {
  _id, 
  _createdAt, 
  title, 
  slug, 
  category, 
  image, 
  pitch, 
  views,
  author -> {_id, name, image, bio} 
}
`);
