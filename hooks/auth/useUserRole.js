import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";

/**
 *
 * Get User Roles and Permissions Hook
 *
 * @returns {Object} Roles and Permissions
 *
 */

export const getFeature = (roles, feature) => {
  return roles?.find((role) => role.feature === feature);
};

export const useUserRole = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState({});
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setUserRole(user.department.roles);
      setDepartment(user.department.name);
      setEmail(user.email);
      setLoading(false);
    }
  }, [user]);

  return {
    userRole,
    userDepartment: department,
    userEmail: email,
    userIsLoading: loading,
  };
};
