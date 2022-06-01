import MediaUpload from "@/modules/MediaUpload/MediaUpload";
import { UseFormStateReturn } from "react-hook-form";
import { IFormValuesCollection } from "../ContainerCollectionForm";
import FieldsCollection from "./FieldsCollection";

const CollectionDetails = (props: any) => {
  const formState =
    props.formState as UseFormStateReturn<IFormValuesCollection>;

  const collectionErrors = Object.values(
    formState.errors.collection || {}
  ).reduce(
    (prev, curr, index) => ({
      ...prev,
      [Object.keys(formState.errors.collection || {})[index]]: curr.message,
    }),
    {
      title: "",
      creator: "",
      contractAddress: "",
      description: "",
      initialToken: "",
      image: "",
    }
  );

  return (
    <div className="w-full  flex flex-col gap-12">
      <h2 className="text-4xl font-medium">Collection Info</h2>

      <div className="grid grid-cols-2 gap-16">
        <FieldsCollection {...props} />
        <MediaUpload
          error={collectionErrors.image}
          name="collection.image"
          label="Collection Media"
          {...props}
        />
      </div>
    </div>
  );
};

export default CollectionDetails;
