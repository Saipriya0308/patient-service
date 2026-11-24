package com.nayani.hmis.patientservice.service;

import com.nayani.hmis.patientservice.exception.PatientNotFoundException;
import com.nayani.hmis.patientservice.model.patient;
import com.nayani.hmis.patientservice.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;

    public patient registerPatient(patient patient) {
        patientRepository.findByPhone(patient.getPhone()).ifPresent(existing -> {
            throw new IllegalArgumentException("A patient with this phone number already exists");
        });
        return patientRepository.save(patient);
    }

    public patient getPatientById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new PatientNotFoundException(id));
    }

    public List<patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public List<patient> searchByName(String name) {
        return patientRepository.findByNameContainingIgnoreCase(name);
    }

    public List<patient> searchByGender(String gender){
        return patientRepository.findByGenderIgnoreCase(gender);
    }

    public patient updatePatient(Long id, patient updated) {
        patient existing = getPatientById(id);
        existing.setName(updated.getName());
        existing.setAge(updated.getAge());
        existing.setGender(updated.getGender());
        existing.setPhone(updated.getPhone());
        existing.setEmail(updated.getEmail());
        return patientRepository.save(existing);
    }

    public void deletePatient(Long id) {
        patient existing = getPatientById(id);
        patientRepository.delete(existing);
    }
}