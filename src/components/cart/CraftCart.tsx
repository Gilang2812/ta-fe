import React, { Fragment } from "react";
import { CartItemComponent } from "../craft/CartItem";
import { CartSummary } from "../craft/CartSummary";
import { motion } from "framer-motion";
import { useUserCraftCart } from "@/hooks/useUserCraftCart";
import CraftCartSkeletonLoader from "../loading/CraftCartSkeletonLoader";
import { FaStore } from "react-icons/fa6";

const CraftCart = () => {
  const {
    isLoading,
    isUpdating,
    updateCraftCart,
    isDirty,
    setIsDirty,
    handleDeleteCraftCart,
    handleCheckedCraft,
    selectedCraft,
    handleCheckout,
    groupedCarts
  } = useUserCraftCart();

  if (isLoading) {
    return <CraftCartSkeletonLoader />;
  }

  return (
    <motion.div
      layoutId="cartPage"
      className="py-4 grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      <div className="lg:col-span-2">
        <div className="p-6 border rounded-lg ">
          <table className="w-full [&_th]:p-4  [&_td]:p-2  ">
            <thead className="py-2 border-b">
              <tr>
                <th>#</th>
                <th>PRODUCT</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>SUBTOTAL</th>
              </tr>
            </thead>

            <tbody className="space-y-4">

              {Object.values(groupedCarts).map((group, index) => (
                <Fragment key={index}>
                  <tr key={index} className="bg-primary/30 ">
                    <td colSpan={6} className="font-semibold p-2">
                      <div className="flex items-center gap-2">
                        <FaStore />
                        {group[0].detailCraft.souvenirPlace.name}
                      </div>
                    </td>
                  </tr>
                  {group.map((item) => (
                    <CartItemComponent
                      setDirty={setIsDirty}
                      selectedCraft={selectedCraft}
                      isUpdating={isUpdating}
                      updateCart={updateCraftCart}
                      key={`${item.checkout_id}-${item.craft_variant_id}-${item.id_souvenir_place}`}
                      item={item}
                      handleDeleteCart={handleDeleteCraftCart}
                      handleCheckedCraft={handleCheckedCraft}
                    />
                  ))}
                  <tr>
                    <td colSpan={6} >  </td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="lg:col-span-1">
        <CartSummary
          handleCheckout={handleCheckout}
          isDirty={isDirty}
          subtotal={selectedCraft.reduce(
            (acc, curr) => acc + curr.jumlah * curr.unit_price,
            0
          )}
          total={selectedCraft.reduce(
            (acc, curr) => acc + curr.jumlah * curr.unit_price,
            0
          )}
        />
      </div>
    </motion.div>
  );
};

export default CraftCart;
