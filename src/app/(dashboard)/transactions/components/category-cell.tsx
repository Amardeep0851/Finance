import React from 'react';

type CategoryCellProps = {
  id:string;
  category:string;
  categoryId:string;
}

function CategoryCell({id, category, categoryId}:CategoryCellProps) {
  return (
    <div>{category}</div>
  )
}

export default CategoryCell