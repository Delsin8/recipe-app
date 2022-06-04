import React, { createContext, ReactNode, useContext, useState } from 'react'

const AuthContext = createContext(null)

export const useAuth = () => {
  return useContext(AuthContext)
}
