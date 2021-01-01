const mockCourseSection = {
  data: [
    {
      coursetitle: "CPSC 221 Basic Algorithms and Data Structures",
      coursedept: "CPSC",
      coursenumber: "221",
      sectiontitle: "CPSC 221 L1F",
    },
    {
      coursetitle: "CPSC 221 Basic Algorithms and Data Structures",
      coursedept: "CPSC",
      coursenumber: "221",
      sectiontitle: "CPSC 221 L1C",
    },
  ],
  success: true,
};

export const fetchData = () => {
  return new Promise((resolve, reject) => {
    resolve(mockCourseSection);
  });
};
