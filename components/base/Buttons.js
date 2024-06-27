export const SimpleButton = ({ children, size, ...props }) => {
  return (
    <button
      className={`flex h-10 cursor-pointer items-center justify-center gap-4 rounded-[3px] bg-[rgba(9,30,66,0.04)] px-3 py-1 text-sm font-medium leading-5 tracking-tight text-[#42526e] transition hover:bg-[rgba(9,30,66,0.08)] focus:bg-[#253858] focus:text-white focus:shadow-md active:bg-[rgba(179,212,255,0.6)] active:text-[#0052CC] disabled:cursor-not-allowed disabled:bg-[rgba(9,30,66,0.04)] disabled:text-slate-400 ${
        size === "sm" ? "h-6" : ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export const PrimaryButton = ({ children, size, ...props }) => {
  return (
    <button
      className={`flex h-10 cursor-pointer items-center justify-center gap-4 rounded-[3px] bg-[#0052CC] px-3 py-1 text-sm font-medium leading-5 tracking-tight text-white transition hover:bg-[#0065FF] focus:bg-blue-800 focus:text-white focus:shadow-md active:bg-[#0747A6] active:text-white disabled:cursor-not-allowed disabled:bg-[rgba(9,30,66,0.04)] ${
        size === "sm" ? "h-6" : ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export const DangerButton = ({ children, size, ...props }) => {
  return (
    <button
      className={`flex h-10 cursor-pointer items-center justify-center gap-4 rounded-[3px] bg-[#DE350B] px-3 py-1 text-sm font-medium leading-5 tracking-tight text-white transition hover:bg-[#FF5630] focus:bg-[#BF2600] focus:text-white focus:shadow-md active:bg-[#BF2600] active:text-white disabled:cursor-not-allowed disabled:bg-[rgba(9,30,66,0.04)] ${
        size === "sm" ? "h-6" : ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

// export const DangerButton = styled("button", {
//   variants: {
//     size: {
//       sm: {
//         height: 16,
//       },
//       md: {
//         height: 32,
//       },
//     },
//   },

//   all: "unset",
//   alignItems: "center",
//   backgroundColor: "#DE350B",
//   borderRadius: "3px",
//   color: "#FFFFFF",
//   cursor: "pointer",
//   display: "flex",
//   flexDirection: "row",
//   fontWeight: 500,
//   fontSize: 14,
//   lineHeight: "20px",
//   gap: 4,
//   height: 32,
//   padding: "4px 12px",

//   "&:hover": {
//     backgroundColor: "#FF5630",
//   },

//   "&:active": {
//     backgroundColor: "#BF2600",
//   },

//   "&:selected": {
//     backgroundColor: "#BF2600",
//   },

//   "&:disabled": {
//     backgroundColor: "rgba(9, 30, 66, 0.04)",
//     color: "#A5ADBA",
//     cursor: "not-allowed",
//   },
//   "&:focus": {
//     boxShadow: "0 0 0 2px #B3D4FF",
//   },
// });

export const SubtleButton = ({ children, size, ...props }) => {
  return (
    <button
      className={`flex h-10 cursor-pointer items-center justify-center gap-4 rounded-[3px] bg-transparent px-3 py-1 text-sm font-medium leading-5 tracking-tight text-[#42526e] transition hover:bg-[rgba(9,30,66,0.08)] focus:bg-[#253858] focus:text-white focus:shadow-md active:bg-[rgba(179,212,255,0.6)] active:text-[#0052CC] disabled:cursor-not-allowed disabled:bg-[rgba(9,30,66,0.04)] ${
        size === "sm" ? "h-6" : ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
};
