
export const setupObserver = (observer, ref, isObserving, cb) => {
  if (!ref) return;
  observer.disconnect();
  observer = null;
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting && isObserving) {
          const data = await cb();
          return data;
        }
      });
    },
    { root: null, threshold: 0.1 }
    );
    observer.observe(ref)
};

export const observe = (observer, ref) => {
    if (observer) {
        observer.observe(ref)
    }
}


//   observerObserve() {
//       if (this.loadingObserver) {
//         this.loadingObserver.observe(this.loadingRef as HTMLElement);
//       }
// },
  
  
  
    // observerUnobserve() {
    //   if (this.loadingObserver) {
    //     this.loadingObserver.unobserve(this.loadingRef as HTMLElement);
    //     this.loadingObserver = null;
    //   }
    //   this.isObserving = false;
    // },
