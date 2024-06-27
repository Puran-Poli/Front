export default async function handler(req, res) {
  res.redirect(`${process.env.NEXT_PUBLIC_PRODUCTS_API}/user/login`);
}
