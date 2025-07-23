export async function getStaticPaths(path: string) {
  const validPaths = [
    {
      routeName: "headphones",
      productType: "headphone"
    },
    {
      routeName: "speakers",
      productType: "speaker"
    },
    {
      routeName: "earphones",
      productType: "earphone"
    }
  ];

  return validPaths.some(validPath => validPath.routeName.toLowerCase() === path.toLowerCase())
}