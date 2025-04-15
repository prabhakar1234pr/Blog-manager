// Examples of array operations in React

// Example 1: Removing an item by index
const numbers = [1, 2, 3, 4, 5];
const removeIndex = 2;

// ❌ Wrong way - direct mutation
numbers.splice(removeIndex, 1);

// ✅ Correct way - create new array
const newNumbers = numbers.filter((_, index) => index !== removeIndex);

// Example 2: Removing by condition
const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];

// ✅ Remove item by id
const newItems = items.filter(item => item.id !== targetId);

// Example 3: Using spread operator
const fruits = ['apple', 'banana', 'orange'];

// ✅ Add and remove items immutably
const newFruits = [...fruits.slice(0, 1), 'grape', ...fruits.slice(2)];