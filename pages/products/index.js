import * as React from "react";
import Head from "next/head";

// Component imports
import Products from "@/components/products/Products";
import Filters from "@/components/products/Filters";
import Pagination from "@/components/products/Pagination";
import ProductsSkeleton from "@/components/products/ProductsSkeleton";

// Hook imports
import { useFetchProducts, useVersion } from "@/hooks/products/useProducts";

export default function Home() {
  const version = useVersion();
  const {
    setFilters,
    products,
    setSort,
    page,
    setPage,
    pageSize,
    handlePageChange,
    productRange,
    setProductRange,
    productIsLoading,
  } = useFetchProducts();
  console.log(products)

  return (
    <div className="w-full">
      <Head>
        <title>Chanakya - Products</title>
        <meta name="description" content="Chanakya - By Techtact.co" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex">
          <Filters
            paginationData={setFilters}
            productRange={setProductRange}
            productPage={setPage}
          />
          <section className="product_list w-full px-8">
            {productIsLoading ? (
              <ProductsSkeleton />
            ) : !productIsLoading && products?.info?.total_items === 0 ? (
              <div className="flex h-96 w-full items-center justify-center">
                <p className="text-2xl font-semibold text-slate-500">
                  No products found
                </p>
              </div>
            ) : (
              <>
                <Products products={products} sorting={setSort} />
                <hr className="mt-12 mb-5 border" />
                <Pagination
                  products={products}
                  productRange={productRange}
                  page={page}
                  pageSize={pageSize}
                  handlePageChange={handlePageChange}
                />
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
