"use client";

import {
  checkSlugExist,
  createUpdateProduct,
  deleteProductImage,
} from "@/actions";
import { ProductImage } from "@/components";
import useDebounce from "@/hooks/useDebounce";
import {
  Category,
  Gender,
  Product,
  ProductImage as ProductImageModel,
} from "@/interfaces";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  product: Partial<Product> & { ProductImage?: ProductImageModel[] };
  categories: Category[] | undefined;
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: Gender;
  categoryId: string;
  images?: FileList;
}

export const ProductForm = ({ product, categories }: Props) => {
  const [searchSlug, setSearchSlug] = useState("");
  const [isSlugRepeat, setIsSlugRepeat] = useState(false);
  const debouncedSearch = useDebounce(searchSlug, 500);

  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { isValid, errors },
    getValues,
    setValue,
    setError,
    clearErrors,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(", "),
      sizes: product.sizes ?? [],
      images: undefined,
    },
  });

  watch("sizes"); // watch indica las prop que, al cambiar su valor, deben volver a renderizar la vista

  const onSizeChanged = (size: string) => {
    /*  const selectedSizes = getValues("sizes");
      selectedSizes.includes(size)
      ? selectedSizes.splice(selectedSizes.indexOf(size), 1)
      : selectedSizes.push(size); */
    //OLD_WAY

    const selectedSizes = new Set(getValues("sizes"));
    selectedSizes.has(size)
      ? selectedSizes.delete(size)
      : selectedSizes.add(size);

    setValue("sizes", Array.from(selectedSizes));
  };

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();
    const { images, ...productToSave } = data;

    if (product.id) {
      formData.append("id", product.id ?? "");
    }
    formData.append("title", productToSave.title);
    formData.append("slug", productToSave.slug);
    formData.append("description", productToSave.description);
    formData.append("price", productToSave.price.toString());
    formData.append("inStock", productToSave.inStock.toString());
    formData.append("sizes", productToSave.sizes.toString());
    formData.append("tags", productToSave.tags);
    formData.append("categoryId", productToSave.categoryId);
    formData.append("gender", productToSave.gender);

    if (images) {
      for (let index = 0; index < images.length; index++) {
        formData.append("images", images[index]);
      }
    }

    const { ok, product: updatedProduct } = await createUpdateProduct(formData);

    if (!ok) {
      alert("Producto no se pudo actualizar");
      return;
    }

    router.replace(`/product/${updatedProduct?.slug}`);
  };

  useEffect(() => {
    const checkSlug = async () => {
      const isRepeat = await checkSlugExist(debouncedSearch);
      if (isRepeat) {
        setIsSlugRepeat(true);
        setError("slug", {
          type: "validate",
          message: "El Slug ya existe, introduzca uno diferente",
        });
      } else {
        setIsSlugRepeat(false);
        clearErrors("slug");
      }
    };

    if (debouncedSearch) {
      checkSlug();
    }
  }, [debouncedSearch, clearErrors, setError]);

  const onChangeSlug = async (slug: string) => {
    setSearchSlug(slug);
  };

  const inputClassName = (inputName: keyof FormInputs) =>
    clsx(
      "p-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-400  ",
      {
        "focus:ring-rose-400": errors[inputName],
        "focus:ring-1": errors[inputName],
        "border-rose-400": errors[inputName],
      }
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-16">
      <div className="grid px-5  grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
        {/* Textos */}
        <div className="w-full">
          <div className="flex flex-col mb-2">
            <span>Título</span>
            <input
              type="text"
              className={inputClassName("title")}
              {...register("title", {
                required: true,
                onChange: () => {
                  if (errors.title) {
                    clearErrors("title");
                  }
                },
              })}
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Slug</span>
            <input
              type="text"
              className={inputClassName("slug")}
              {...register("slug", {
                required: true,
                validate: () =>
                  !isSlugRepeat ||
                  "El Slug ya existe, introduzca uno diferente",
                onChange: (e) => onChangeSlug(e.target.value),
              })}
            />
            {errors.slug?.type === "validate" && (
              <p className="text-rose-400">{errors.slug.message}</p>
            )}
          </div>

          <div className="flex flex-col mb-2">
            <span>Descripción</span>
            <textarea
              rows={5}
              className={inputClassName("description")}
              {...register("description", {
                onChange: () => {
                  if (errors.title) {
                    clearErrors("description");
                  }
                },
                required: true,
              })}
            ></textarea>
          </div>

          <div className="flex flex-col mb-2 border-1">
            <span>Price</span>
            <input
              type="number"
              className={inputClassName("price")}
              {...register("price", {
                onChange: () => {
                  if (errors.title) {
                    clearErrors("price");
                  }
                },
                required: true,
                min: 0,
              })}
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Tags</span>
            <input
              type="text"
              className={inputClassName("tags")}
              {...register("tags", {
                onChange: () => {
                  if (errors.title) {
                    clearErrors("tags");
                  }
                },
                required: true,
              })}
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Gender</span>
            <select
              className={inputClassName("gender")}
              {...register("gender", {
                onChange: () => {
                  if (errors.title) {
                    clearErrors("gender");
                  }
                },
                required: true,
              })}
            >
              <option value="">[Seleccione]</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kid">Kid</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>

          <div className="flex flex-col mb-2">
            <span>Categoria</span>
            <select
              className={inputClassName("categoryId")}
              {...register("categoryId", {
                onChange: () => {
                  if (errors.title) {
                    clearErrors("categoryId");
                  }
                },
                required: true,
              })}
            >
              <option value="">[Seleccione]</option>
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Selector de tallas y fotos */}
        <div className="w-full">
          <div className="flex flex-col mb-2">
            <span>Inventario</span>
            <input
              type="number"
              className={inputClassName("inStock")}
              {...register("inStock", {
                onChange: () => {
                  if (errors.title) {
                    clearErrors("inStock");
                  }
                },
                required: true,
                min: 0,
              })}
            />
          </div>

          {/* As checkboxes */}
          <div className="flex flex-col">
            <span>Tallas</span>
            <div className="flex flex-wrap">
              {sizes.map((size) => (
                // bg-blue-500 text-white <--- si está seleccionado
                <div
                  key={size}
                  onClick={() => onSizeChanged(size)}
                  className={clsx(
                    "p-2 border rounded-md mr-2 mb-2 w-14 transition-all text-center cursor-pointer",
                    {
                      "bg-blue-500 text-white":
                        getValues("sizes").includes(size),
                    }
                  )}
                >
                  <span>{size}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col mb-2">
              <span>Fotos</span>
              <input
                type="file"
                {...register("images")}
                multiple
                className="p-2 border rounded-md bg-gray-200"
                accept="image/png, image/jpeg, image/avif"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {product.ProductImage?.map((image) => (
                <div key={image.id} className="w-fit m-auto">
                  <ProductImage
                    alt={product.title ?? ""}
                    src={image.url}
                    width={300}
                    height={300}
                    className="rounded-t shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => deleteProductImage(image.id, image.url)}
                    className="btn-danger w-full rounded-b-xl"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid px-5  grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3 mt-3">
        <button className="btn-primary w-full">Guardar</button>
      </div>
    </form>
  );
};
