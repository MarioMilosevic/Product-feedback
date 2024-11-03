export const emptyFeedback = {
  category: "",
  // category: "Feature",
  description: "",
  // id: crypto.randomUUID(),
  likes: 0,
  status: "Suggestion",
  title: "",
  // Comments: [],
  // ako su komentari onda nemam error u konzoli vec u supabazi trebam staviti default broj ako nema komentara da bude 0 ako su Comments undefined
};

export const categoryOptions = ["UI", "UX", "Enhancement", "Bug", "Feature"];
export const statusOptions = ["Planned", "In-progress", "Live"];
