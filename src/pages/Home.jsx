// src/pages/Home.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters / controls
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceFilter, setPriceFilter] = useState(0); // current upper bound
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const productsRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [pRes, cRes] = await Promise.all([
          axios.get("https://fakestoreapi.com/products"),
          axios.get("https://fakestoreapi.com/products/categories"),
        ]);

        if (!mounted) return;
        const p = pRes.data;
        setProducts(p);
        setCategories(Array.isArray(cRes.data) ? cRes.data : []);

        // determine min/max price from products
        const prices = p.map((x) => Number(x.price) || 0);
        const minP = Math.floor(Math.min(...prices));
        const maxP = Math.ceil(Math.max(...prices));
        setMinPrice(minP);
        setMaxPrice(maxP);
        setPriceFilter(maxP);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load products. Try again.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchAll();
    return () => {
      mounted = false;
    };
  }, []);

  // derived filtered products
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products
      .filter((p) => p.price <= priceFilter)
      .filter((p) => (selectedCategory === "all" ? true : p.category === selectedCategory))
      .filter((p) => (q ? p.title.toLowerCase().includes(q) : true));
  }, [products, search, priceFilter, selectedCategory]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    // small UX: scroll to products if user selects category on hero
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("all");
    setPriceFilter(maxPrice);
  };

  const onCTAClick = () => {
    // scroll to products
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      toast("Shop a little later — products still loading.");
    }
  };

  // helper
  const format = (val) => `$${Number(val).toFixed(2)}`;

  return (
    <section className="space-y-8">
      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur p-6 md:p-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Ecom Kaif — <span className="text-primary">Futuristic Mini Store</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl">
              Beautifully curated products from Fake Store API. Use the category filters,
              price slider, and search to find items. Built for speed, style and smooth
              demo-ready interactions.
            </p>

            <div className="mt-5 flex flex-wrap gap-3 items-center">
              <Button onClick={onCTAClick} className="bg-linear-to-r from-indigo-600 to-pink-500">
                Shop Now
              </Button>

              <Button variant="outline" onClick={() => { resetFilters(); toast.success("Filters reset"); }}>
                Reset Filters
              </Button>
            </div>

            <div className="mt-6 flex gap-4 items-center">
              <div className="text-sm text-muted-foreground">Popular categories:</div>
              <div className="flex gap-2 flex-wrap">
                {/* show first 4 categories as quick chips */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCategorySelect("all")}
                    className={`px-3 py-1 rounded-md text-sm border border-border ${selectedCategory === "all" ? "bg-muted/40" : "bg-card/40"}`}
                  >
                    All
                  </button>
                </div>

                {categories.slice(0, 6).map((c) => (
                  <button
                    key={c}
                    onClick={() => handleCategorySelect(c)}
                    className={`px-3 py-1 rounded-md text-sm border border-border ${selectedCategory === c ? "bg-muted/40" : "bg-card/40"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Hero art / subtle product grid preview */}
          <div className="hidden md:block">
            <div className="grid grid-cols-2 gap-3">
              {/* Take up to 4 product thumbnails to show as hero preview */}
              {products.slice(0, 4).map((p) => (
                <div key={p.id} className="rounded-lg overflow-hidden border border-border bg-card/60 p-3 flex items-center justify-center">
                  <img src={p.image} alt={p.title} className="max-h-28 object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* subtle neon corner */}
        <div className="pointer-events-none absolute right-6 top-6 w-40 h-28 rounded-xl bg-linear-to-br from-indigo-500/10 to-pink-500/6 blur-lg" />
      </motion.div>

      {/* FILTERS ROW */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by title..."
            className="w-full md:w-[420px]"
          />

          {/* Category dropdown (for narrow screens) */}
          <select
            value={selectedCategory}
            onChange={(e) => handleCategorySelect(e.target.value)}
            className="px-3 py-2 rounded-md border border-border bg-card/60"
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option value={c} key={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Price range slider */}
        <div className="flex-1 md:max-w-sm">
          <div className="text-sm text-muted-foreground mb-2 flex items-center justify-between">
            <div>Price up to: <span className="font-medium">{format(priceFilter)}</span></div>
            <div className="text-xs">Range: {format(minPrice)} - {format(maxPrice)}</div>
          </div>

          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceFilter}
            onChange={(e) => setPriceFilter(Number(e.target.value))}
            className="w-full accent-indigo-500"
          />
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div ref={productsRef} className="space-y-4">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* shimmer placeholders */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-64 rounded-xl border border-border bg-card/40 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-8 rounded-lg border border-border bg-card/60 text-center text-muted-foreground">
            No products .
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
