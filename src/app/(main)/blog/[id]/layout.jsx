export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  return {
    title: `Blog Post ${id} | NeuralLogic`,
    description: `Read more about our insights in this blog post.`,
  };
}

export default function Layout({ children }) {
  return children;
}
