'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const PreBillContext = createContext(null);

export function parsePrice(priceStr) {
  if (!priceStr) return 0;
  const match = priceStr.toString().match(/(\d+)/);
  if (match) {
    return parseInt(match[1], 10) * 1000;
  }
  return 0;
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}

export function PreBillProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Load from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('docmo_prebill');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Cannot load cart from localStorage', e);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('docmo_prebill', JSON.stringify(items));
    } catch (e) {
      console.warn('Cannot save cart to localStorage', e);
    }
  }, [items]);

  const addItem = (dish) => {
    const priceNum = parsePrice(dish.price);
    const cleanName = dish.name ? dish.name.replace(/\s*\*\*\*\s*/g, '').trim() : '';
    
    setItems((prev) => {
      const existing = prev.find((item) => item.name === cleanName);
      if (existing) {
        return prev.map((item) =>
          item.name === cleanName ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: dish.id || cleanName,
          name: cleanName,
          rawPrice: dish.price,
          priceNum,
          image: dish.image || '/images/foods/lau.png',
          section_name: dish.section_name || '',
          quantity: 1,
        },
      ];
    });
  };

  const updateQuantity = (name, delta) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.name === name) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeItem = (name) => {
    setItems((prev) => prev.filter((item) => item.name !== name));
  };

  const clearBill = () => {
    setItems([]);
  };

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.priceNum * item.quantity, 0);

  return (
    <PreBillContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearBill,
        totalQuantity,
        totalPrice,
        isDrawerOpen,
        setIsDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
      }}
    >
      {children}
    </PreBillContext.Provider>
  );
}

export function usePreBill() {
  const context = useContext(PreBillContext);
  if (!context) {
    throw new Error('usePreBill must be used within a PreBillProvider');
  }
  return context;
}
