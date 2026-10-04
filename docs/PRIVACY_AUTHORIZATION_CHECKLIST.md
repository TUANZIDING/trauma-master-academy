# Privacy and teaching authorization / 隐私与教学授权检查表

## Before repository entry / 进入仓库前

- [ ] Name, patient number, identity number, address, exact date, hospital, clinician names, and accession numbers are removed.
- [ ] Pixel-level text in images has been reviewed.
- [ ] EXIF, IPTC, DICOM, office-document, and archive metadata have been reviewed or removed.
- [ ] The filename does not contain an identifier.
- [ ] The narrative is reduced to the minimum facts needed for the teaching objective.
- [ ] Conflicting facts remain marked rather than silently reconciled.
- [ ] De-identification has been reviewed by a human.
- [ ] Teaching authorization states instructor-preview or student-release scope.
- [ ] Image and document reuse rights are recorded separately from patient authorization.

## Static-site warning / 静态网站提示

Instructor mode controls presentation only. It does not provide authentication or confidentiality. Material that is not suitable for public retrieval must not be stored in this Git repository or deployed site.

教师模式只控制课堂呈现，不提供身份认证或保密能力。任何不适合被公开检索的内容都不得存入本 Git 仓库或部署网站。

## Release decision / 发布判断

- `pending_deidentification_review`: no patient payload may be deployed.
- `pending_documented_authorization`: no real-case student release.
- `authorized_for_instructor_preview`: derived material may be used only in the recorded teaching scope.
- `authorized_for_student_release`: de-identified derivative may enter student pages within the recorded scope.
