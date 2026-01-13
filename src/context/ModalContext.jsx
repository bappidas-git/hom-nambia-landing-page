/* ============================================
   Modal Context - Nambiar District 25 Phase 2
   Handles modal state management across the app
   ============================================ */

import React, { createContext, useContext, useState, useCallback } from 'react';

// Create context
const ModalContext = createContext(null);

// Modal types enum
export const MODAL_TYPES = {
  LEAD_FORM: 'LEAD_FORM',
  SITE_VISIT: 'SITE_VISIT',
  CALLBACK: 'CALLBACK',
  BROCHURE: 'BROCHURE',
  FLOOR_PLAN: 'FLOOR_PLAN',
  GALLERY: 'GALLERY',
  VIDEO: 'VIDEO',
  SUCCESS: 'SUCCESS',
  CUSTOM: 'CUSTOM',
};

// Provider component
export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [modalConfig, setModalConfig] = useState({
    showCloseButton: true,
    closeOnBackdrop: true,
    closeOnEscape: true,
    fullScreen: false,
    maxWidth: 'sm',
  });

  // Open modal with type and optional data
  const openModal = useCallback((type, data = null, config = {}) => {
    setModalType(type);
    setModalData(data);
    setModalConfig((prev) => ({ ...prev, ...config }));
    setIsOpen(true);
    // Prevent body scroll when modal is open
    document.body.classList.add('modal-open');
  }, []);

  // Close modal
  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalType(null);
    setModalData(null);
    setModalConfig({
      showCloseButton: true,
      closeOnBackdrop: true,
      closeOnEscape: true,
      fullScreen: false,
      maxWidth: 'sm',
    });
    // Restore body scroll
    document.body.classList.remove('modal-open');
  }, []);

  // Update modal data
  const updateModalData = useCallback((data) => {
    setModalData((prev) => ({ ...prev, ...data }));
  }, []);

  // Shorthand methods for common modals
  const openLeadForm = useCallback((data) => {
    openModal(MODAL_TYPES.LEAD_FORM, data);
  }, [openModal]);

  const openSiteVisit = useCallback((data) => {
    openModal(MODAL_TYPES.SITE_VISIT, data);
  }, [openModal]);

  const openCallback = useCallback((data) => {
    openModal(MODAL_TYPES.CALLBACK, data);
  }, [openModal]);

  const openBrochure = useCallback((data) => {
    openModal(MODAL_TYPES.BROCHURE, data);
  }, [openModal]);

  const openFloorPlan = useCallback((data) => {
    openModal(MODAL_TYPES.FLOOR_PLAN, data, { maxWidth: 'md' });
  }, [openModal]);

  const openGallery = useCallback((data) => {
    openModal(MODAL_TYPES.GALLERY, data, { fullScreen: true, maxWidth: 'lg' });
  }, [openModal]);

  const openVideo = useCallback((data) => {
    openModal(MODAL_TYPES.VIDEO, data, { maxWidth: 'md' });
  }, [openModal]);

  const showSuccess = useCallback((message, title = 'Success') => {
    openModal(MODAL_TYPES.SUCCESS, { message, title });
  }, [openModal]);

  const value = {
    // State
    isOpen,
    modalType,
    modalData,
    modalConfig,
    // Actions
    openModal,
    closeModal,
    updateModalData,
    // Shorthand methods
    openLeadForm,
    openSiteVisit,
    openCallback,
    openBrochure,
    openFloorPlan,
    openGallery,
    openVideo,
    showSuccess,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook to use modal context
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export default ModalContext;
