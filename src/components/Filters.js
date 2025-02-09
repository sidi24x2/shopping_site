import { useContext } from 'react';
import { ProductsContext } from './contexts/ProductsContext';

function Filters() {
  const productsDetails = useContext(ProductsContext);
  const { products, selectOrder } = productsDetails;
  return (
    <div class="filters flex">
      <h5>{`${products.length} Products found`}</h5>
      <h5 className="flex start ">
        Order By :{' '}
        <select onClick={selectOrder}>
          <option value="" hidden>
            Select
          </option>
          <option value="low2high">Low to High</option>
          <option value="high2low">High To Low</option>
        </select>
      </h5>
    </div>
  );
}

export default Filters;
