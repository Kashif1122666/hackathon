// src/pages/Home.jsx
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [priceFilter, setPriceFilter] = useState(0);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        if (!mounted) return;
        setProducts(res.data);
        const maxP = Math.ceil(Math.max(...res.data.map((p) => p.price)));
        setMaxPrice(maxP);
        setPriceFilter(maxP);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProducts();
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products
      .filter(p => p.price <= priceFilter)
      .filter(p => (q ? p.title.toLowerCase().includes(q) : true));
  }, [products, priceFilter, query]);

  return (
    <section>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold">All Products</h2>
          <p className="text-sm text-gray-500">Fetched from Fake Store API</p>
        </div>

        <div className="flex gap-3 items-center">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="px-3 py-2 border rounded-md w-56"
          />
          <div className="text-sm text-gray-600">
            Price up to: <span className="font-medium">${priceFilter}</span>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <input
          type="range"
          min={0}
          max={maxPrice}
          value={priceFilter}
          onChange={(e) => setPriceFilter(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>0</span>
          <span>{maxPrice ? `$${maxPrice}` : "-"}</span>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
