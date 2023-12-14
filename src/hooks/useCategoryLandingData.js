import { useEffect, useState } from "react";
const useCategoryLandingData = (data) => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const generateResult = () => {
      const resultArray = [];
      const { cat_ban_img_vid, childdren } = data;

      for (let i = 0; i < childdren.length; i += 2) {
        const subCatPair = [];
        const pairLength = Math.min(i + 2, childdren.length);

        for (let j = i; j < pairLength; j++) {
          subCatPair.push(childdren[j]);
        }

        resultArray.push({
          sub_cat_pair: subCatPair,
          banner_img: cat_ban_img_vid[i / 2],
        });
      }

      setResult(resultArray);
    };

    generateResult();
  }, [data]);

  return result;
};

export default useCategoryLandingData;
