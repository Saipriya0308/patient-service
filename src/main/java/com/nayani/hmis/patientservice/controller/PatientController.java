package com.nayani.hmis.patientservice.controller;

import com.nayani.hmis.patientservice.model.patient;
import com.nayani.hmis.patientservice.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    @PostMapping
    public ResponseEntity<patient> registerPatient(@Valid @RequestBody patient patient) {
        patient saved = patientService.registerPatient(patient);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<patient> getPatient(@PathVariable Long id) {
        return ResponseEntity.ok(patientService.getPatientById(id));
    }

    @GetMapping
    public ResponseEntity<List<patient>> getAllPatients() {
        return ResponseEntity.ok(patientService.getAllPatients());
    }

    @GetMapping("/search")
    public ResponseEntity<List<patient>> searchByName(@RequestParam String name) {
        return ResponseEntity.ok(patientService.searchByName(name));
    }

    @GetMapping("/search/Gender")
    public ResponseEntity<List<patient>> searchByGender(@RequestParam String name) {
        return ResponseEntity.ok(patientService.searchByGender(name));
    }

    @PutMapping("/{id}")
    public ResponseEntity<patient> updatePatient(@PathVariable Long id,
                                                 @Valid @RequestBody patient patient) {
        return ResponseEntity.ok(patientService.updatePatient(id, patient));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
        return ResponseEntity.noContent().build();
    }
}