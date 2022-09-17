import axios from "axios";

const API_KEY = "24827423-94023a6c518e3be22ea88dc29";

async function findImages(searchValue, page) {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${searchValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  const pictures = await response.data;
  return pictures;
}

export default findImages;
