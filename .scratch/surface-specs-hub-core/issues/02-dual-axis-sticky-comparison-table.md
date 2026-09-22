# Issue 02: Dual-Axis Sticky Comparison Table

Status: resolved
Type: task

## Goal
Build horizontal comparison table with first column sticky left and header card sticky top, difference detection, and "only show diffs" toggle.

## Answer
Implemented in `js/comparison-engine.js` and `css/spec-table.css`. Difference calculation via `checkFieldDiff`, column reordering, and CSS class toggling verified by Test Suite 3.
