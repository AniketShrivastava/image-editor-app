interface ToolbarButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'success' | 'danger' | 'dark' | 'warning'
  icon: React.ReactNode
}

const variantStyles = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  success: 'bg-green-600 hover:bg-green-700 text-white',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  dark: 'bg-gray-700 hover:bg-gray-800 text-white',
  warning: 'bg-yellow-400 hover:bg-yellow-500 text-black',
}

export const ToolbarButton = ({
  label,
  onClick,
  variant = 'primary',
  icon,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2
        px-3 py-2
        rounded-lg
        text-sm font-medium
        transition-all duration-200
        shadow-sm hover:shadow-md
        active:scale-95
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400
        ${variantStyles[variant]}
      `}
    >
      <span className="w-4 h-4 flex items-center justify-center">
        {icon}
      </span>
      <span className="hidden sm:inline">{label}</span>
    </button>
  )
}
