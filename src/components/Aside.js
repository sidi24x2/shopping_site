import { useContext } from 'react';
import { ProductsContext } from './contexts/ProductsContext';

function Aside() {
  let productsDetails = useContext(ProductsContext);

  const { addSizes, allSize, sizes } = productsDetails;

  return (
    <>
      <section class="aside container">
        <ul class="sizes flex wrap start">
          {allSize.map((size) => {
            return (
              <li key={size}>
                <button
                  className={
                    sizes.includes(size) ? 'flex center active' : 'flex center'
                  }
                  onClick={() => addSizes(size)}
                >
                  {size}
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

export default Aside;
