"use client"
import { cn } from "@/lib/utils";

type QuantitySelectorProps = {
  maxQuantity: number;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  disabled?: boolean;
  minQuantity?: number;
}

export default function QuantitySelector({ maxQuantity, quantity, onQuantityChange, disabled = false, minQuantity = 1 }: QuantitySelectorProps) {
  const buttonControlClasses = cn(
    "flex",
    "items-center",
    "justify-center",
    "bg-transparent",
    "w-[33%]",
    "opacity-25",
    "focus:outline-0",
    "not-disabled:hover:cursor-pointer",
    "not-disabled:hover:text-audiophile-orange",
    "not-disabled:hover:opacity-100",
    "disabled:hover:cursor-auto",
  );

  const inputClasses = cn(
    "w-[33%]",
    "text-center",
    "focus:outline-0",
    "disabled:opacity-25"
  );

  const handleIncrement = () => {
    const num = Math.min(maxQuantity, quantity + 1);
    onQuantityChange(num);
  }

  const handleDecrement = () => {
    const num = Math.max(minQuantity, quantity - 1);
    onQuantityChange(num);
  }

  const handleQuantityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const num = Math.max(minQuantity, Math.min(maxQuantity, Number(value) || minQuantity));
    onQuantityChange(num);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleIncrement();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleDecrement();
    }
  };

  return (
    <div 
      className="inline-flex justify-center max-w-[120px] h-[48px] bg-audiophile-gray subtitle-text"
      role="group"
      aria-label={`Quantity selector, current quantity ${quantity}, maximum ${maxQuantity}`}
    >
      <button 
        className={buttonControlClasses} 
        disabled={disabled || quantity <= minQuantity} 
        onClick={handleDecrement}
        aria-label={`Decrease quantity, current quantity ${quantity}`}
        type="button"
      >
        -
      </button>
      <input 
        name="quantity" 
        autoComplete="off" 
        className={inputClasses} 
        value={quantity} 
        onChange={handleQuantityInputChange}
        onKeyDown={handleKeyDown}
        disabled={disabled} 
        aria-label="Product quantity"
        aria-valuemin={minQuantity} 
        aria-valuemax={maxQuantity}
        aria-valuenow={quantity}
        role="spinbutton"
      />
      <button 
        className={buttonControlClasses} 
        disabled={disabled || quantity >= maxQuantity} 
        onClick={handleIncrement}
        aria-label={`Increase quantity, current quantity ${quantity}`}
        type="button"
      >
        +
      </button>
    </div>
  );
}