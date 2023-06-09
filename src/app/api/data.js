export default async function handler(req, res) {
  const response = await fetch('https://api.ppdb.jabarprov.go.id/portal/registrant?page=1&limit=200&pagination=false&orderby=created_at&order=asc&columns[0][key]=name&columns[0][searchable]=true&columns[1][key]=registration_number&columns[1][searchable]=true&filters[0][key]=first_school.npsn&filters[0][value]=20224113&filters[1][key]=option_type&filters[1][value]=prestasi-rapor&filters[2][key]=first_option.major_id&filters[2][value]=');
  const data = await response.json();
  res.status(200).json(data);
}
