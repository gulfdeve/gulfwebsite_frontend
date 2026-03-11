"use client";
import { useState, ReactNode, useMemo, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  options?: string[] | DropdownOption[];
  width?: string;
  children?: ReactNode;
  searchable?: boolean;
  selected?: string;
  onSelect?: (value: string) => void;
  value?: string;
  onChange?: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options = [],
  width,
  children,
  searchable = false,
  selected: controlledSelected,
  onSelect,
  value: controlledValue,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelected, setInternalSelected] = useState<string>(label);
  const [search, setSearch] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use controlled value if provided, otherwise use selected
  const value =
    controlledValue !== undefined ? controlledValue : controlledSelected;

  // Sync with parent controlled value
  useEffect(() => {
    if (value !== undefined) {
      const displayText = getOptionDisplayText(value);
      setInternalSelected(displayText);
    } else {
      setInternalSelected(label);
    }
  }, [value, label]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Normalize options to always be in { label, value } format
  const normalizedOptions = useMemo((): DropdownOption[] => {
    if (options.length === 0) return [];

    if (typeof options[0] === "string") {
      return (options as string[]).map((opt) => ({ label: opt, value: opt }));
    }
    return options as DropdownOption[];
  }, [options]);

  const getOptionDisplayText = (optionValue: string): string => {
    if (!optionValue) return label;

    const option = normalizedOptions.find((opt) => opt.value === optionValue);
    return option?.label || optionValue || label;
  };

  const filteredOptions = useMemo(() => {
    if (!normalizedOptions.length) return [];
    if (!searchable || !search) return normalizedOptions;

    return normalizedOptions.filter(
      (opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase()) ||
        opt.value.toLowerCase().includes(search.toLowerCase())
    );
  }, [normalizedOptions, search, searchable]);

  const handleSelect = (optionValue: string) => {
    if (!value) {
      // Only update internal state if not controlled
      setInternalSelected(getOptionDisplayText(optionValue));
    }

    // Call parent callbacks
    if (onSelect) onSelect(optionValue);
    if (onChange) onChange(optionValue);

    setIsOpen(false);
    setSearch("");
  };

  const handleTriggerClick = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setSearch("");
    }
  };

  const displayText = value ? getOptionDisplayText(value) : internalSelected;

  return (
    <div
      ref={dropdownRef}
      className="relative font-primary select-none"
      style={{ width: width || "150px" }}
    >
      {/* Trigger */}
      <div
        className={`flex items-center justify-between border-r border-[#afaaaa89] px-2 py-2 bg-white cursor-pointer text-sm transition-all duration-200 ${
          isOpen ? "border-gray-400 shadow-sm" : "border-[#afaaaa89]"
        } ${displayText === label ? "text-gray-600" : "text-gray-900"}`}
        onClick={handleTriggerClick}
      >
        <div className="flex flex-col gap-1 justify-center">
          <span className="text-primary" suppressHydrationWarning>{label}</span>
          <span className="flex-1 break-words text-gray-600">
            {displayText !== label ? displayText : ""}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 flex-shrink-0 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="absolute left-0 top-full mt-1 border border-gray-200 rounded-lg shadow-lg bg-white z-50 max-h-60 overflow-hidden"
          style={{ width: width || "150px", minWidth: "100%" }}
        >
          {children ? (
            <div className="p-2">{children}</div>
          ) : (
            <>
              {/* Search field */}
              {searchable && (
                <div className="p-2 border-b border-gray-100">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-gray-400"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                  />
                </div>
              )}

              {/* Options list */}
              <div className="max-h-48 overflow-y-auto">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                    <button
                      key={`${option.value}-${index}`}
                      type="button"
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                        value === option.value
                          ? "bg-gray-100 text-gray-600 font-medium"
                          : "text-gray-700"
                      }`}
                      onClick={() => handleSelect(option.value)}
                    >
                      {option.label}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-2 text-sm text-gray-500 text-center">
                    No options found
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
