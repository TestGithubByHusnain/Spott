/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Calendar, Loader2 } from "lucide-react";
import { State, City } from "country-state-city";
import { format } from "date-fns";
import { useConvexQuery, useConvexMutation } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { createLocationSlug } from "@/lib/location-utils";
import { getCategoryIcon } from "@/lib/data";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function SearchLocationBar() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef(null);

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // ------------------------------
  // FETCH USER + UPDATE LOCATION
  // ------------------------------
  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);

  const { mutate: updateLocation } = useConvexMutation(
    api.users.completeOnboarding
  );

  useEffect(() => {
    if (currentUser?.location) {
      setSelectedState(currentUser.location.state || "");
      setSelectedCity(currentUser.location.city || "");
    }
  }, [currentUser]);

  // ------------------------------
  // STATES OF PAKISTAN
  // ------------------------------
  const pakistanStates = useMemo(
    () => State.getStatesOfCountry("PK"),
    []
  );

  // ------------------------------
  // CITIES OF SELECTED STATE
  // ------------------------------
  const cities = useMemo(() => {
    if (!selectedState) return [];

    const stateObj = pakistanStates.find((s) => s.name === selectedState);
    if (!stateObj) return [];

    // FIXED: Country code must be PK, not IN
    return City.getCitiesOfState("PK", stateObj.isoCode) || [];
  }, [selectedState, pakistanStates]);

  // ------------------------------
  // SEARCH (DEBOUNCED)
  // ------------------------------
  const { data: searchResults, isLoading: searchLoading } = useConvexQuery(
    api.search.searchEvents,
    searchQuery.length >= 2 ? { query: searchQuery, limit: 5 } : "skip"
  );

  const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  const debouncedSearch = useMemo(
    () => debounce((value) => setSearchQuery(value), 300),
    []
  );

  const handleSearchInput = (e) => {
    const value = e.target.value;
    debouncedSearch(value);
    setShowSearchResults(value.length >= 2);
  };

  // ------------------------------
  // CLICK SEARCH RESULT
  // ------------------------------
  const handleEventClick = (slug) => {
    setShowSearchResults(false);
    setSearchQuery("");
    router.push(`/events/${slug}`);
  };

  // ------------------------------
  // UPDATE USER LOCATION & REDIRECT
  // ------------------------------
  const handleLocationSelect = async (city, state) => {
    try {
      if (currentUser?.interests && currentUser?.location) {
        await updateLocation({
          location: { city, state, country: "Pakistan" },
          interests: currentUser.interests,
        });
      }

      const slug = createLocationSlug(city, state);
      router.push(`/explore/${slug}`);
    } catch (err) {
      console.error("Location update failed:", err);
    }
  };

  // Close results when clicking outside
  useEffect(() => {
    const close = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="flex items-center">
      {/* SEARCH BAR */}
      <div className="relative flex w-full" ref={searchRef}>
        <div className="flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

          <Input
            placeholder="Search events..."
            onChange={handleSearchInput}
            onFocus={() => searchQuery.length >= 2 && setShowSearchResults(true)}
            className="pl-10 w-full h-9 rounded-none rounded-l-md"
          />
        </div>

        {/* SEARCH RESULTS DROPDOWN */}
        {showSearchResults && (
          <div className="absolute top-full mt-2 w-96 bg-background border rounded-lg shadow-lg z-50 max-h-[400px] overflow-y-auto">
            {searchLoading ? (
              <div className="p-4 flex items-center justify-center">
                <Loader2 className="w-5 h-5 animate-spin text-purple-500" />
              </div>
            ) : searchResults?.length > 0 ? (
              <div className="py-2">
                <p className="px-4 py-2 text-xs font-semibold text-muted-foreground">
                  SEARCH RESULTS
                </p>

                {searchResults.map((event) => (
                  <button
                    key={event._id}
                    onClick={() => handleEventClick(event.slug)}
                    className="w-full px-4 py-3 hover:bg-muted/50 text-left transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl mt-0.5">
                        {getCategoryIcon(event.category)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-medium mb-1 line-clamp-1">
                          {event.title}
                        </p>

                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {format(event.startDate, "MMM dd")}
                          </span>

                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {event.city}
                          </span>
                        </div>
                      </div>

                      {event.ticketType === "free" && (
                        <Badge variant="secondary" className="text-xs">
                          Free
                        </Badge>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* STATE SELECT */}
      <Select
        value={selectedState}
        onValueChange={(value) => {
          setSelectedState(value);
          setSelectedCity("");
        }}
      >
        <SelectTrigger className="w-32 h-9 border-l-0 rounded-none">
          <SelectValue placeholder="State" />
        </SelectTrigger>

        <SelectContent>
          {pakistanStates.map((state) => (
            <SelectItem key={state.isoCode} value={state.name}>
              {state.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* CITY SELECT */}
      <Select
        value={selectedCity}
        disabled={!selectedState}
        onValueChange={(value) => {
          setSelectedCity(value);
          handleLocationSelect(value, selectedState);
        }}
      >
        <SelectTrigger className="w-32 h-9 rounded-none rounded-r-md">
          <SelectValue placeholder="City" />
        </SelectTrigger>

        <SelectContent>
          {cities.map((city) => (
            <SelectItem key={city.name} value={city.name}>
              {city.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
