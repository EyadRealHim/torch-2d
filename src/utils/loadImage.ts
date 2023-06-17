
export default function loadImage(url: string | URL) {
  const image = new Image();
  image.src = url instanceof URL ? url.href : url;

  return new Promise<HTMLImageElement>((resolve, reject) => {
    image.onload = () => resolve(image);
    image.onerror = reject;
  });
}
