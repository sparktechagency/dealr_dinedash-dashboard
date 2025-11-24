import { useParams } from "react-router-dom";

import { Card, Image, Typography } from "antd";
import { useGetRecipeByIdQuery } from "../../../Redux/api/driver/recipe";
import { baseUrl } from "../../../constant/baseUrl";
import Spinner from "../../Shared/Spinner";

const { Title, Text, Paragraph } = Typography;

const RecipeDetails = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetRecipeByIdQuery(id);
  const recipe = data?.data;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="max-h-[87vh] overflow-y-auto rounded-xl bg-[#B7CDF5] border-2 border-[#185DDE] scrollbar-hide">
      <div className="">
        <div className="">
          <div className="text-3xl font-medium rounded-t-lg  bg-[#185DDE] text-white mb-5">
            <h1 className="text-3xl font-medium rounded-t-lg p-5 bg-[#185DDE] text-white">
              Dealer Details
            </h1>
          </div>
        </div>
      </div>

      <Card
        // style={{ maxWidth: 600, margin: "20px auto" }}
        bordered={false}
        bodyStyle={{ padding: "0px 24px" }}
      >
        {/* Image */}
        <Image
          src={`${baseUrl}/${recipe?.image}`}
          alt="Moroccan Chicken Tagine"
          className="rounded-xl w-full !h-[300px] object-cover"
          preview={false}
        />

        <div>
          {/* Title and author */}
          <Title level={3} className="!text-[#185DDE]">
            {recipe?.recipeName}
          </Title>
          <Text
            type="secondary"
            className="!text-black font-semibold"
            style={{ display: "block", marginBottom: 16 }}
          >
            <span className="!font-normal">by</span> {recipe?.userId?.name}
          </Text>

          <Typography>
            <Title level={4}>Description</Title>
            <Paragraph className="text-base">{recipe?.description}</Paragraph>

            <Title level={4}>Ingredients</Title>
            {/* <List
              size="small"
              dataSource={[
                "2 cups of main ingredient",
                "1 tablespoon of seasoning",
                "3 cloves of garlic, minced",
                "1/2 cup of broth or water",
                "Fresh herbs to taste",
                "Salt and pepper to taste",
              ]}
              renderItem={(item) => (
                <List.Item
                  className="text-base"
                  style={{
                    paddingLeft: 3,
                    listStyleType: "disc",
                    display: "list-item",
                  }}
                >
                  {item}
                </List.Item>
              )}
              bordered={false}
              split={false}
            /> */}
            <Paragraph className="text-base">{recipe?.ingredients}</Paragraph>

            <Title level={4}>Instructions</Title>
            {/* <List
              size="small"
              dataSource={[
                "2 cups of main ingredient",
                "1 tablespoon of seasoning",
                "3 cloves of garlic, minced",
                "1/2 cup of broth or water",
                "Fresh herbs to taste",
                "Salt and pepper to taste",
              ]}
              renderItem={(item) => (
                <List.Item
                  className="text-base"
                  style={{
                    paddingLeft: 3,
                    listStyleType: "-moz-initial",
                    display: "list-item",
                  }}
                >
                  {item}
                </List.Item>
              )}
              bordered={false}
              split={false}
            /> */}

            <Paragraph className="text-base">{recipe?.instruction}</Paragraph>

            <Title level={4} style={{ marginTop: 20 }}>
              Cultural Background
            </Title>
            <Paragraph className="text-base">
              {recipe?.cultureBackground}
            </Paragraph>
          </Typography>
        </div>
      </Card>
    </div>
  );
};

export default RecipeDetails;
